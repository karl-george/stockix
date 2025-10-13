import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'static2.finnhub.io',
      },
    ],
  },
};

export default nextConfig;
