import type { NextConfig } from 'next';

const BACKEND_URL = process.env.BACKEND_URL ?? 'http://localhost:5000';

export default {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  /**
   * /api/:path* へのリクエストをバックエンドへプロキシする。
   * Route Handler が存在するパスはそちらが優先される。
   */
  rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${BACKEND_URL}/:path*`,
      },
    ];
  },
} satisfies NextConfig;
