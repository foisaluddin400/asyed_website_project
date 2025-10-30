/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "f46h4cb1-3001.asse.devtunnels.ms",
        pathname: "/**", // সব path allow
      },
      {
        protocol: "http",
        hostname: "10.10.20.22",
        port: "3001",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.ibb.co",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
