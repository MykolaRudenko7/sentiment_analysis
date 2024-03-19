/** @type {import('next').NextConfig} */

const nextConfig = {
    sassOptions: {
        additionalData: `@import "src/styles/main.scss";`,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '**',
            },
        ],
    },
}

export default nextConfig
