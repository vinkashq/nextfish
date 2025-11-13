import fs from 'fs-extra';
import path from 'path';
import type { NextConfig } from "next";

// eslint-disable-next-line no-unused-vars
const withPluginRoutes = (pluginName) => {
  const pluginRoutes = path.join(process.cwd(), 'plugins', pluginName, 'routes');
  const appRoutes = path.join(process.cwd(), 'src', 'app', '(plugins)', pluginName);
  fs.copySync(pluginRoutes, appRoutes);
};

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  rewrites: async () => {
    const firebaseOptions = process.env.FIREBASE_WEBAPP_CONFIG ? JSON.parse(process.env.FIREBASE_WEBAPP_CONFIG) : {}
    const projectId = firebaseOptions.projectId;
    if (!projectId) {
      return [];
    }

    return [
      {
        // 1. Source: This is the path the browser requests on your custom domain.
        // It matches the Firebase Auth handler paths (__/auth/handler, __/auth/iframe, etc.).
        source: "/__/:path*",
        
        // 2. Destination: This is where the Next.js server secretly fetches the file from.
        // It points to the *actual* location of the Firebase Auth handler files.
        destination: `https://${projectId}.web.app/__/:path*`,
      }
    ]
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
    // withPluginRoutes('your-plugin-directory-name');
    return config;
  },
};

export default nextConfig;
