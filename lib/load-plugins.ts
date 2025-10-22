import type { Plugin } from '@/types/plugin';

export async function loadPlugins(): Promise<Plugin[]> {
  const plugins = await import('@/plugins/registry').then(m => m.plugins);
  return plugins;
}
