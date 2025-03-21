import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'spoonacular.com',
        port: '',
        pathname: '/cdn/**',
      },
    ],
  },
};

export default nextConfig;
