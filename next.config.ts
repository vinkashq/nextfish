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
  headers: async () => [{
    source: '/account/:path*',
    headers: [
      {
        key: 'Cache-Control',
        value: 'no-store, no-cache, must-revalidate, private'
      },
      {
        key: 'X-Robots-Tag',
        value: 'noindex, nofollow'
      }
    ]
  }, {
    source: '/app/:path*',
    headers: [
      {
        key: 'Cache-Control',
        value: 'no-store, no-cache, must-revalidate, private'
      },
      {
        key: 'X-Robots-Tag',
        value: 'noindex, nofollow'
      }
    ]
  }, {
    source: '/api/:path*',
    headers: [
      {
        key: 'Cache-Control',
        value: 'no-store, no-cache, must-revalidate, private'
      },
      {
        key: 'X-Robots-Tag',
        value: 'noindex, nofollow'
      }
    ]
  }, {
    source: '/admin/:path*',
    headers: [
      {
        key: 'Cache-Control',
        value: 'no-store, no-cache, must-revalidate, private'
      },
      {
        key: 'X-Robots-Tag',
        value: 'noindex, nofollow'
      }
    ]
  }],
  redirects: async () => [],
  webpack: (config) => {
    withPluginRoutes('auth');
    return config;
  },
};

export default nextConfig;
