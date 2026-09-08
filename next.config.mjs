/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  experimental: {
    serverComponentsExternalPackages: ['firebase-admin', 'googleapis'],
  },
  images: {
    domains: ['images.unsplash.com', 'lexminds.in'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/cancellation-and-refund-policy',
        destination: '/refund-policy',
        permanent: true,
      },
      {
        source: '/cancellation-refund-policy',
        destination: '/refund-policy',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
