import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90, 92],
  },
  // Canonical host is non-www — collapse www to avoid duplicate indexing
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.tempsureinsurance.co.uk" }],
        destination: "https://tempsureinsurance.co.uk/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
