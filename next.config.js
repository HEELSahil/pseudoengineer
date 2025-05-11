/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
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
