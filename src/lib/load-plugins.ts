import type { Plugin } from '@/types/plugin';
import { plugins } from './registry';

export async function loadPlugins(): Promise<Plugin[]> {
  return plugins;
}
