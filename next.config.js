/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  metadata: {
    metadataBase: new URL(
      process.env.NODE_ENV === 'production'
        ? 'https://www.pseudoengineer.dev'
        : 'http://localhost:3000'
    )
  }
};

module.exports = nextConfig;