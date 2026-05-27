'use client'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Layout from '@/components/Layout'
import { useLayout } from '@/components/LayoutContext'
import { AppError } from '@/types/enums'

const errorMap: Record<AppError, { header: string, message: string }> = {
  [AppError.Configuration]: {
    header: 'Configuration Error',
    message: 'There is a problem with the server configuration. Check if your options are correct.',
  },
  [AppError.AccessDenied]: {
    header: 'Access Denied',
    message: 'Usually occurs, when you restricted access through the signIn callback, or redirect callback.',
  },
  [AppError.Verification]: {
    header: 'Verification Error',
    message: 'Related to the Email provider. The token has expired or has already been used.',
  },
  [AppError.Default]: {
    header: 'Default Error',
    message: 'Catch all, will apply, if none of the above matched.',
  },
}

const UserError = () => {
  const searchParams = useSearchParams()
  const error: AppError = searchParams.get('error') as AppError || AppError.Default
  const { showError } = useLayout()

  useEffect(() => {
    const errorInfo = errorMap[error] || errorMap[AppError.Default]
    showError({ errors: [errorInfo.header, errorInfo.message] })
  }, [error, showError])

  return (
    <Layout>
      <></>
    </Layout>
  )
}

export default UserError
