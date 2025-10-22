import fs from 'fs';
import path from 'path';
import type { Plugin } from '@/types/plugin';

const pluginsDir = path.join(process.cwd(), 'plugins');

export const plugins: Plugin[] = fs.readdirSync(pluginsDir)
  .filter((name) => {
    // Only include directories that contain a plugin.ts file
    return fs.existsSync(path.join(pluginsDir, name, 'plugin.ts'));
  })
  .map((name) => {
    const pluginModule = require(path.join(pluginsDir, name, 'plugin.ts'));
    return pluginModule.default as Plugin;
  });
