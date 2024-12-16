/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['sunytech-next-ecommerce.s3.amazonaws.com',
    'suntech-next-ecommerce.s3.amazonaws.com',],
  },
}

module.exports = nextConfig
