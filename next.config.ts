import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://frontend-test-api.yoldi.agency/api/'
  },
  images: {
    domains: ['frontend-test-api.yoldi.agency'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'frontend-test-api.yoldi.agency',
        port: '',
        pathname: '/api/image/**',
      },
    ],
  },
};

export default nextConfig;
