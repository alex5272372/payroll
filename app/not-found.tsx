'use client'
import { useEffect } from 'react'
import Layout from '@/components/Layout'
import { useOverlay } from '@/components/overlay/OverlayContext'

const NotFound = () => {
  const { showError } = useOverlay()

  useEffect(() => {
    showError({
      errors: ['404'],
      properties: { ['Not Found']: { errors: ['The page you are looking for does not exist.'] }}})
  }, [showError])

  return (
    <Layout>
      <></>
    </Layout>
  )
}

export default NotFound
