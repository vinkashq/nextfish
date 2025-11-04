"use server"

import path from 'path';
import type { Plugin } from '@/types/plugin';
import { existsSync, readdirSync } from 'fs';

const pluginsDir = path.join(process.cwd(), 'plugins');

export const plugins: Plugin[] = readdirSync(pluginsDir)
  .filter((name) => {
    // Only include directories that contain a plugin.ts file
    return existsSync(path.join(pluginsDir, name, 'plugin.ts'));
  })
  .map((name) => {
    const pluginModule = require(path.join(pluginsDir, name, 'plugin.ts'));
    return pluginModule.default as Plugin;
  });
