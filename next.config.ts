import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF en premier : ~30% plus léger que WebP, fallback WebP automatique
    formats: ["image/avif", "image/webp"],
    // Largeurs générées pour le srcset (adaptées aux breakpoints du site)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Cache des variantes optimisées côté serveur : 1 an
    minimumCacheTTL: 31536000,
  },
  async headers() {
    return [
      {
        // Images servies en direct depuis /public (background-image, <use href>, OG)
        source: "/img/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
