/** @type {import('next').NextConfig} */
const apiDev = process.env.NEXT_PUBLIC_API_URL_DEV;
const apiOp = process.env.NEXT_PUBLIC_API_URL_OP;
const isDev = process.env.NODE_ENV === "development";
const defaultUrl = isDev ? apiDev : apiOp;

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  async rewrites() {
    return [
      {
        source: "/franchise/:path*",
        destination: `${defaultUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
