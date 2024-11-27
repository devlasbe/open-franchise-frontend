/** @type {import('next').NextConfig} */
const apiDev = process.env.NEXT_PUBLIC_API_URL_DEV;
const apiOp = process.env.NEXT_PUBLIC_API_URL_OP;
const isDev = process.env.NODE_ENV === "development";
const defaultUrl = isDev ? apiDev : apiOp;

console.log(defaultUrl);
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
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
