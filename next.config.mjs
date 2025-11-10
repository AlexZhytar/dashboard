import createNextIntlPlugin from 'next-intl/plugin';

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

const withNextIntl = createNextIntlPlugin();

export default withNextIntl( nextConfig );