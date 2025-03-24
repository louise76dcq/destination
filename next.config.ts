/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['localhost'],
    },
    async rewrites() {
        return [
            {
                source: '/api/destination/:path*',
                destination: 'http://localhost:5241/api/destination/:path*',
            },
        ];
    },
};

export default nextConfig;

