/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: '../.next',
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  poweredByHeader: false,
  experimental: {
    serverComponentsExternalPackages: ['firebase-admin', 'googleapis'],
  },
  images: {
    domains: [
      'images.unsplash.com',
      'lexminds.in',
      'lh3.googleusercontent.com',
      'googleusercontent.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'lexminds.in',
      },
    ],
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
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
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
