import { type NextConfig } from "next";

const config: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  },
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default config;
