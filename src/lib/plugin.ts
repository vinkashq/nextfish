import { defaultMenu, menus } from '@/config/menu';
import { Menu } from '@/types/menu';
import { MenuItem } from '@/types/menu-item';

export function addMenu(item: Menu) {
  menus.push(item)
}

export function addDefaultMenuItem(item: MenuItem) {
  defaultMenu.items.push(item)
}
