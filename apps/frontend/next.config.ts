import type { NextConfig } from 'next';

export default {
  reactStrictMode: true,
  transpilePackages: ['api-types'],
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
} satisfies NextConfig;
