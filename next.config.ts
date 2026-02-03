import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'cdn.rri.co.id' },
      { protocol: 'https', hostname: 'mandorpro.id' },
      { protocol: 'https', hostname: 'asiacon.co.id' },
      { protocol: 'https', hostname: 'www.rumah123.com' },
      { protocol: 'https', hostname: 'tobaccoreporter.com' },
      { protocol: 'http', hostname: '127.0.0.1', port: '8000' },
      { protocol: 'http', hostname: 'localhost', port: '8000' },
      { protocol: 'https', hostname: 'admin.jaladewacloud.com' },
    ],
  },
};

export default nextConfig;
