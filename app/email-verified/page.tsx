'use client'
import { useEffect } from 'react'
import Layout from '@/components/Layout'
import { useLayout } from '@/components/LayoutContext'

const EmailVerified = () => {
  const { showOk } = useLayout()

  useEffect(() => {
    showOk('Email verified', 'Your email has been verified successfully.')
  }, [showOk])

  return (
    <Layout>
      <></>
    </Layout>
  )
}

export default EmailVerified
