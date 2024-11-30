/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  ...nextConfig,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'x-metadata-base',
            value: process.env.NODE_ENV === 'production'
              ? 'https://www.pseudoengineer.dev'
              : 'http://localhost:3000'
          }
        ]
      }
    ];
  }
};