import { MenuType } from "@/types/enum";
import { RouteObject } from "react-router-dom";

/**
 * 判断当前是否为开发环境
 * @returns boolean
 */
function isDevelopmentEnv() {
  return import.meta.env.MODE == "development";
}

/**
 * 菜单转换, 子菜单的itemKey会加上父级的key,格式为：<parentKey>_<childKey>
 * @param menus
 * @returns
 */
function menuItemToNavItem(menus: MenuItem[], parentKey: string): any {
  if (!menus) {
    return null;
  }
  const result: Array<any> = [];
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
    const navItem = {
      itemKey: menu.parentId
        ? _parentKey == ""
          ? menu.name
          : _parentKey + "_" + menu.name
        : menu.name,
      text: menu.locale ?? menu.name,
      icon: menu.icon,
      items:
        menu.children && menu.children.length > 0
          ? menuItemToNavItem(menu.children, _parentKey)
          : null,
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
        : parentKey + "_" + route.path
    )!.replace("/", "");
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

export { isDevelopmentEnv, menuItemToNavItem, generateRouteMap };
