// import type { NextConfig } from "next";
import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.join(__dirname, '../../'),
  experimental: {
  }
}

module.exports = nextConfig
// export default nextConfig;
