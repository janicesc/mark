/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/videos/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ]
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "iconlogovector.com", pathname: "/**" },
      { protocol: "https", hostname: "digitalfrontier.com", pathname: "/**" },
      { protocol: "https", hostname: "images.seeklogo.com", pathname: "/**" },
    ],
  },
}

export default nextConfig
