import { RouteObject } from "react-router-dom";
import { MenuType } from "./types/enum";

declare global {
  interface MenuItemMeta {
    label?: string;
    key?: string;
    closable?: boolean;
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
    contentKey: string; // 更改次key方便手动刷新组件
  }

  /** RouteObject with meta */
  type MenuItemExt = RouteObject & { meta?: MenuItemMeta }

  interface BreadcrumbItem {
    name?: string;
    path: string;
    href?: string;
    icon?: ReactElement<any, string | JSXElementConstructor<any>> | null;
    canRoute?: boolean;
  }
}
