/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "iconlogovector.com", pathname: "/**" },
      { protocol: "https", hostname: "digitalfrontier.com", pathname: "/**" },
    ],
  },
}

export default nextConfig
