'use client'
import './globals.css'
import React, { useEffect, useState } from 'react'
import Loader from '@/components/Loader'

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000)
  }, [])

  return (
    <html lang="en" className="h-full bg-gray-100">
      <body className="h-full">
        {loading ? <Loader /> : children}
      </body>
    </html>
  )
}

export default RootLayout
