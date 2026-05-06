import './globals.css'
import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { OverlayProvider } from '@/components/OverlayContext'

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className="h-full bg-gray-100">
        <SessionProvider>
          <OverlayProvider>
            {children}
          </OverlayProvider>
        </SessionProvider>
      </body>
    </html>
  )
}

export default RootLayout
