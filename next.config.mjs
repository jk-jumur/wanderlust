/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: false,
 images: {
    remotePatterns: [
      {
        protocol: 'https',
        // hostname: 'picsum.photos',
          hostname: "**"
      ,
      },
      {
        protocol: 'https',
        // hostname: 'images.unsplash.com',
          hostname: "**",
      },
    ],
  },
};

export default nextConfig;
