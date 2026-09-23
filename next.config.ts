import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  output: "standalone",
  outputFileTracingRoot: __dirname, // Set correct root to avoid warning
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: '**', // Permetti domini HTTPS per immagini esterne
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: `${process.env.BACKEND_URL || "http://localhost:5000"}/uploads/:path*`,
      },
    ];
  },
};

export default nextConfig;