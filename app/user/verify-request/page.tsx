'use client'
import { useEffect } from 'react'
import Layout from '@/components/Layout'
import { useLayout } from '@/components/LayoutContext'

const VerifyRequest = () => {
  const { showOk } = useLayout()

  useEffect(() => {
    showOk('Check your email', 'A sign in link has been sent to your email address.')
  }, [showOk])

  return (
    <Layout>
      <></>
    </Layout>
  )
}

export default VerifyRequest
