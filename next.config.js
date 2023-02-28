/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
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
