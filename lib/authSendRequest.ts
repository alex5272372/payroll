import { EmailProviderSendVerificationRequestParams } from 'next-auth/providers'

interface Theme {
  colorScheme?: 'auto' | 'dark' | 'light'
  logo?: string
  brandColor?: string
  buttonText?: string
}

const html = (params: {
  url: string;
  host: string,
  theme: Theme,
  providerName: string
}) => {
  const { url, host, theme, providerName } = params
  const buttonLabel = providerName.replace('SendGrid ', '')

  const escapedHost = host.replace(/\./g, '&#8203;.')
  const brandColor = theme.brandColor || '#346df1'

  const color = {
    background: '#f9f9f9',
    text: '#444',
    mainBackground: '#fff',
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: theme.buttonText || '#fff',
  }

  return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Action required on <strong>${escapedHost}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
              target="_blank"
              style="
                font-size: 18px;
                font-family: Helvetica, Arial, sans-serif;
                color: ${color.buttonText};
                text-decoration: none;
                border-radius: 5px;
                padding: 10px 20px;
                border: 1px solid ${color.buttonBorder};
                display: inline-block;
                font-weight: bold;
            ">
              ${buttonLabel}
            </a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="
          padding: 0px 0px 10px 0px;
          font-size: 16px;
          line-height: 22px;
          font-family: Helvetica, Arial, sans-serif;
          color: ${color.text};
      ">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
</body>
`
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
const text = ({ url, host }: { url: string; host: string }) => {
  return `Action required on ${host}\n${url}\n\n`
}

export const sendVerificationRequest = async (
  params: EmailProviderSendVerificationRequestParams
) => {
  const { identifier: to, provider, url, theme } = params
  const { host } = new URL(url)
  const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${provider.apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{
        to: [{ email: to }],
      }],
      from: { email: provider.from },
      subject: `Action required on ${host}`,
      content: [
        { type: 'text/plain', value: text({ url, host }) },
        { type: 'text/html', value: html({ url, host, theme, providerName: provider.name }) },
      ],
    }),
  })

  if (!res.ok) throw new Error('Sendgrid error: ' + (await res.text()))
}
