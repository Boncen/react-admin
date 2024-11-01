import { MenuType } from "@/types/enum";
import { RouteObject } from "react-router-dom";

/**
 * 菜单转换, 子菜单的itemKey会加上父级的key,格式为：<parentKey>_<childKey>
 * @param menus
 * @returns
 */
function menuItemToNavItem(
  menus: MenuItem[],
  parentKey: string
): NavItemPropsWithItemsExt[] | null {
  if (!menus) {
    return null;
  }
  const result: Array<NavItemPropsWithItemsExt> = [];
  let _parentKey = parentKey ?? "";
  for (let index = 0; index < menus.length; index++) {
    const menu = menus[index];
    if (menu.menuType == MenuType.BUTTON) {
      continue;
    }
    if (!menu.parentId || menu.parentId == "") {
      _parentKey = "";
    }
    if (menu.menuType == MenuType.CATEGORY) {
      _parentKey += menu.name;
    }
    const navItem: NavItemPropsWithItemsExt = {
      itemKey: menu.parentId
        ? _parentKey == ""
          ? menu.name
          : _parentKey + "/" + menu.name
        : menu.name,
      text: menu.locale ?? menu.name,
      locale: menu.locale,
      icon: menu.icon,
      // @ts-ignore
      items:
        menu.children && menu.children.length > 0
          ? menuItemToNavItem(menu.children, _parentKey)
          : undefined,
    };
    result.push(navItem);
  }
  return result;
}

/** 从routes生成routemap对象 */
function generateRouteMap(
  routes: RouteObject[],
  parentKey: string
): Record<string, string> {
  let result: Record<string, string> = {};
  for (let index = 0; index < routes.length; index++) {
    const route = routes[index];
    if (route.path == "/") {
      result["home"] = "/";
    }
    if (!route.path) {
      continue;
    }
    // debugger
    if (route.path!.indexOf(":") > -1 || route.path == "*") {
      continue;
    }
    if (route.children && route.children.length > 0) {
      const childResult = generateRouteMap(route.children, route.path!);
      result = { ...result, ...childResult };
      continue; // 父级菜单不需要点击跳转路由
    }
    const key = (
      !parentKey || parentKey == "" || parentKey == "/"
        ? route.path
        : parentKey + "/" + route.path
    )!;
    const path =
      !parentKey || parentKey == "" || parentKey == "/"
        ? route.path
        : parentKey + "/" + route.path;
    if (key && path) {
      result[key] = path!;
    }
  }
  return result;
}

/** 根据id(e.g. 0-3-1)找menu */
function findMenuByNestedId(
  menuList: Array<MenuItemExt>,
  id: string
): MenuItemExt | undefined {
  const ids = id.split("-");
  let route: MenuItemExt | undefined = menuList[Number(ids[0])];
  if (route && route.children) {
    for (let index = 1; index < ids.length; index++) {
      const id = Number(ids[index]);
      if (!isNaN(id)) {
        route = route!.children![id] ?? route;
      }
    }
  }
  return route;
}

export {
  menuItemToNavItem,
  generateRouteMap,
  findMenuByNestedId,
};
