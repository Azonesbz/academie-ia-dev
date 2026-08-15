import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // better-sqlite3 est un module natif : il doit rester hors du bundle.
  serverExternalPackages: ["better-sqlite3"],
};

export default nextConfig;
