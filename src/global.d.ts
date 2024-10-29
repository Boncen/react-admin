// import { IndexRouteObject } from "react-router-dom";

import { MenuType } from "./types/enum";

declare global {
  interface MenuItemMeta {
    label?: string;
    key?: string;
  }

  interface MenuItem {
    id: string;
    parentId?: string;
    path: string;
    name: string;
    icon?: string;
    order?: number;
    menuType: MenuType;
    locale: string;
    children?: Array<MenuItem>;
  }

  interface TabItem {
    tab: string;
    itemKey: string;
    text: ReactElement<any, string | JSXElementConstructor<any>> | null;
    closable?: boolean;
  }

  // interface MenuItem extends IndexRouteObject {
  //   meta: MenuItemMeta;
  // }
}
