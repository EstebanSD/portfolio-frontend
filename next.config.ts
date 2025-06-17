import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['react-i18next'],
  },
  trailingSlash: false,
};

export default nextConfig;
