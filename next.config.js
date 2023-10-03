/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "onlineorderapp.the-lms.com/",
        port: "",
      },
    ],
  },
  // Add the following line for static HTML export with App Router
  output: {
    export: true,
  },
};

module.exports = nextConfig;
