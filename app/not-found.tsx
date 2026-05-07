'use client'
import { useEffect } from 'react'
import Layout from '@/components/Layout'
import { useOverlay } from '@/components/OverlayContext'

const NotFound = () => {
  const { showError } = useOverlay()

  useEffect(() => {
    showError('Not Found', 'This page could not be found.')
  }, [showError])

  return (
    <Layout>
      <></>
    </Layout>
  )
}

export default NotFound
