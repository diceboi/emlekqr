import withVideos from 'next-videos';

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "elmekqr-storage.s3.amazonaws.com",
            },
            {
                protocol: "https",
                hostname: "elmekqr-storage.s3.us-east-1.amazonaws.com",
            },
        ],
    },
    transpilePackages: ['three'],
};

export default withVideos(nextConfig);
