/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tshirtsexpress.s3.us-east-2.amazonaws.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "10.10.20.22",
        port: "3001",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "f46h4cb1-3001.asse.devtunnels.ms",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s3cmd5kk-3001.asse.devtunnels.ms",
        pathname: "/**",
      },
    ],
  },

  transpilePackages: ["fabric"],
};

export default nextConfig;
