'use client'
import { useEffect } from 'react'
import Layout from '@/components/Layout'
import { useOverlay } from '@/components/overlay/OverlayContext'

const EmailVerified = () => {
  const { showOk } = useOverlay()

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
