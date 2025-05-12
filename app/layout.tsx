'use client'
import './globals.css'
import React, { useEffect, useState } from 'react'
import { SessionProvider } from 'next-auth/react'
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
    <html lang="en">
      <body className="h-full bg-gray-100">
        <SessionProvider>
          {loading ? <Loader /> : children}
        </SessionProvider>
      </body>
    </html>
  )
}

export default RootLayout
