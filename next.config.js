/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'assets.pseudoengineer.dev' },
    ],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },

  async headers() {
    return [
      {
        source: '/:all*.(png|jpg|jpeg|gif|webp|avif|svg|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          {
            key: 'x-metadata-base',
            value:
              process.env.NODE_ENV === 'production'
                ? 'https://www.pseudoengineer.dev'
                : 'http://localhost:3000',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
