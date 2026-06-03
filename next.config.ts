import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      { hostname: 'images.ctfassets.net' }
    ],
  },
}

export default nextConfig
