/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "",
        pathname: "/blog-cms/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;