import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  turbopack: {
    root: process.cwd(), // tells Turbopack to use the current directory as the root
  },
};

export default nextConfig;
