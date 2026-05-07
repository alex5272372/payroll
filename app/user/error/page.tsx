'use client'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Layout from '@/components/Layout'
import { useOverlay } from '@/components/OverlayContext'

enum Error {
  Configuration = 'Configuration',
  AccessDenied = 'AccessDenied',
  Verification = 'Verification',
  Default = 'Default',
}

const errorMap: Record<Error, { header: string, message: string }> = {
  [Error.Configuration]: {
    header: 'Configuration Error',
    message: 'There is a problem with the server configuration. Check if your options are correct.',
  },
  [Error.AccessDenied]: {
    header: 'Access Denied',
    message: 'Usually occurs, when you restricted access through the signIn callback, or redirect callback.',
  },
  [Error.Verification]: {
    header: 'Verification Error',
    message: 'Related to the Email provider. The token has expired or has already been used.',
  },
  [Error.Default]: {
    header: 'Default Error',
    message: 'Catch all, will apply, if none of the above matched.',
  },
}

const UserError = () => {
  const searchParams = useSearchParams()
  const error: Error = searchParams.get('error') as Error || Error.Default
  const { showError } = useOverlay()

  useEffect(() => {
    const errorInfo = errorMap[error] || errorMap[Error.Default]
    showError(errorInfo.header, errorInfo.message)
  }, [error, showError])

  return (
    <Layout>
      <></>
    </Layout>
  )
}

export default UserError
