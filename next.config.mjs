/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/chat',
        destination: 'http://185.225.233.14:8000/chat',
      },
      {
        source: '/api/auth/signup',
        destination: 'https://y-balash.vercel.app/api/auth/signup',
      },
      {
        source: '/api/auth/login',
        destination: 'https://y-balash.vercel.app/api/auth/login',
      },
      {
        source: '/api/auth/:path*',
        destination: '/api/auth/:path*',
      },
      {
        source: '/api/:path*',
        destination: 'https://y-balash.vercel.app/api/:path*',
      },
    ];
  },
};

export default nextConfig;
