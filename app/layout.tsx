import '@/app/globals.css'
import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { LayoutProvider } from '@/components/LayoutContext'

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className="h-full bg-gray-100">
        <SessionProvider>
          <LayoutProvider>
            {children}
          </LayoutProvider>
        </SessionProvider>
      </body>
    </html>
  )
}

export default RootLayout
