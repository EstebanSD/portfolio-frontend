import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['react-i18next'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  trailingSlash: false,
};

export default nextConfig;
