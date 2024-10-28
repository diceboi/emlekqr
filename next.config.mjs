/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "elmekqr-storage.s3.amazonaws.com",
            }
        ]
    },
    transpilePackages: [
        'three'
    ],

};

export default nextConfig;
