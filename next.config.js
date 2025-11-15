/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/5',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig

