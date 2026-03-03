import type { NextConfig } from 'next';

export default {
  reactStrictMode: true,
  transpilePackages: ['api-types'],
  typescript: {
    ignoreBuildErrors: false,
  },
} satisfies NextConfig;
