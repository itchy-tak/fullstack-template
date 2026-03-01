import type { NextConfig } from 'next';

export default {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
} satisfies NextConfig;
