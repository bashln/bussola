import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/*": ["./content/**/*"],
    "/lessons/[slug]": ["./content/**/*"],
    "/courses/[slug]": ["./content/**/*"],
    "/projects/[slug]": ["./content/**/*"],
  },
};

export default nextConfig;
