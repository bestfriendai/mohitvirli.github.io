import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // skip strict mode
  reactStrictMode: false,
  env: {
    googleAnalyticsId: process.env.NODE_ENV === "production" ? process.env.GA_MEASUREMENT_ID : "",
  },
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
