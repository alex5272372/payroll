'use client'
import { useSearchParams } from 'next/navigation'
import ErrorDialog from '@/components/MainDialog/ErrorDialog'

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

  return <ErrorDialog header={errorMap[error].header} message={errorMap[error].message} />
}

export default UserError
