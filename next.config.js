/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'www.mockupworld.co',
          },
          {
            protocol: 'http',
            hostname: 'localhost',
          },
          {
            protocol: 'http',
            hostname: '192.168.1.99',
          },
          {
            protocol: 'https',
            hostname: 'api.bomboonsan.com',
          },
          {
            protocol: 'https',
            hostname: 'boschthailandbackend.bomboonsan.com',
          },
        ],
    },
}

module.exports = nextConfig
