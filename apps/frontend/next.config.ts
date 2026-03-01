import type { NextConfig } from 'next';

export default {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
} satisfies NextConfig;
