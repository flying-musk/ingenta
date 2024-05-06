/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  basePath: isProd ? "/ingenta" : "",
  output: "export",
  reactStrictMode: true,
};

export default nextConfig;
