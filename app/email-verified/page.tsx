'use client'
import { useEffect } from 'react'
import Layout from '../layout'
import { useOverlay } from '@/components/OverlayContext'

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
