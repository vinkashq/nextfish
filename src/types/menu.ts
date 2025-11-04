import { MenuItem } from "./menu-item";

export interface Menu {
  title: string,
  baseUrl: string,
  items: MenuItem[],
}
