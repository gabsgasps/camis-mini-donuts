/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.typebot.io',
        port: '',
        pathname: '/public/**',
      },
    ],
  },
};

module.exports = nextConfig;
