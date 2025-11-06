/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://dashboard-backend.testsofts.com/api/:path*',
      },
    ];
  },
};

export default nextConfig;
