/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, options) {
    if (options.isServer) config.devtool = "source-map";
    return config;
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
