import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
            },
            {
                protocol: "http",
                hostname: "localhost",
            },
        ],
    },
    redirects: async () => [
        {
            source: "/author/:path*",
            destination: "/", // or '/404'
            permanent: false, // temporary so Google drops it
        },
    ],
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
