/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "f46h4cb1-3001.asse.devtunnels.ms", pathname: "/**" },
      { protocol: "http", hostname: "10.10.20.22", port: "3001", pathname: "/**" },
      { protocol: "https", hostname: "i.ibb.co", pathname: "/**" },
      { protocol: "https", hostname: "s3cmd5kk-3001.asse.devtunnels.ms", pathname: "/**" },
    ],
  },

  // এই লাইনটা যোগ করতেই হবে
  transpilePackages: ["fabric"],
};

export default nextConfig;