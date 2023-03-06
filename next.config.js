/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true
  },
  i18n,
  async rewrites() {
    return [
      {
        source: '/planets',
        destination: '/'
      }
    ];
  }
};

module.exports = nextConfig;
