import fs from 'fs-extra';
import path from 'path';
import type { NextConfig } from "next";

const withPluginRoutes = (pluginName) => {
  const pluginRoutes = path.join(process.cwd(), 'plugins', pluginName, 'routes');
  const appRoutes = path.join(process.cwd(), 'app', '(plugins)', pluginName);
  fs.copySync(pluginRoutes, appRoutes);
};

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [];
  },
  webpack(config) {
    withPluginRoutes('auth');
    return config;
  },
};

export default nextConfig;
