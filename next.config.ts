import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'images.ctfassets.net' }
    ],
  },
}

export default nextConfig
