import { IndexRouteObject } from "react-router-dom";

declare global {
  interface MenuItemMeta {
    label: string;
    key: string;
  }

  interface MenuItem extends IndexRouteObject {
    meta: MenuItemMeta;
  }
}
