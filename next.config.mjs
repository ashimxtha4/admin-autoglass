/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'backend.autoglassshop.com.au',
        port: '',
        search: ''
      }
    ]
  }
}

export default nextConfig
