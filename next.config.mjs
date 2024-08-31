/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "elmekqr-storage.s3.amazonaws.com",
            }
        ]
    }
};

export default nextConfig;
