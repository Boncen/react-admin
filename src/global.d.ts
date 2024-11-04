import { RouteObject } from "react-router-dom";
import { MenuType } from "./types/enum";
import { NavItemPropsWithItems } from "@douyinfe/semi-ui/lib/es/navigation";

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
  type MenuItemExt = RouteObject & {
    meta?: MenuItemMeta;
    name: string;
    fullPath?: string;
    children?: MenuItemExt[];
  };

  type NavItemPropsWithItemsExt = NavItemPropsWithItems & { locale?: string };

  interface BreadcrumbItem {
    name?: string;
    path: string;
    href?: string;
    icon?: ReactElement<any, string | JSXElementConstructor<any>> | null;
    canRoute?: boolean;
  }

  interface Setting {
    isDarkMode: boolean;
    lang?: string;
    isUseMultitab: boolean;
    isUseBreadcrumb: boolean;
  }
  interface SearchFormData {
    type: "string" | "date" | "number" | "date-range" | "number-range" | "time" | "select" | "multi-select";
    name: string;
    label: string;
    isHide?: boolean;
    placeholder?: string;
    /** 多选 */
    options?: Array<any>;
  }
  interface SearchFormConfig {
    col: number,
    datas: Array<SearchFormData>,
    submit?: (result: Record<string, any>) => void
  }


}
