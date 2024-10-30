import useMenuStore from "@/store/useMenuStore";
import { findMenuByNestedId } from "@/utils";
import { Breadcrumb } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMatches } from "react-router-dom";

export function Breadcrumbs() {
  const matches = useMatches();
  const menus = useMenuStore((state) => state.menus);
  const { t } = useTranslation();
  const [routes, setRoutes] = useState<Array<BreadcrumbItem | string>>([]);

  useEffect(() => {
    const routes: Array<BreadcrumbItem> = [];
    for (let index = 0; index < matches.length; index++) {
      const matchItem = matches[index];
      const routeItem: MenuItemExt | undefined = findMenuByNestedId(
        menus,
        matchItem.id
      );
      if (routeItem?.path == "/") {
        routes.push({
          path: routeItem.path!,
          name: t("home"),
          canRoute: true,
        });
        continue;
      }
      if (!routeItem) {
        continue;
      }
      routes.push({
        path: routeItem.path!,
        name: routeItem.meta?.label
          ? t(routeItem.meta?.label as string)
          : routeItem.path,
        canRoute: !routeItem.children || routeItem.children.length < 1,
      });
    }
    setRoutes(routes);
  }, [matches, menus]);

  // function handleClickBreadcrumb(target: RouteProps): void {
  //   console.log(target)
  //   if ((target as BreadcrumbItem).canRoute === false) {
  //     return;
  //   }
  //   let path = "";

  //   for (let index = 0; index < routes.length; index++) {
  //     const route = routes[index];
  //     console.log(route);
  //     path = ( "/" + path + "/" +
  //       (isBreadcrumbItem(route)
  //         ? (route as BreadcrumbItem).path
  //         : (route as string))) as string;
  //     if (
  //       route == target ||
  //       (target as BreadcrumbItem).name == (route as BreadcrumbItem).name
  //     ) {
  //       if (path) {
  //         navigate(path);
  //       }
  //       break;
  //     }
  //   }
  // }
  // function isBreadcrumbItem(
  //   value: BreadcrumbItem | string
  // ): value is BreadcrumbItem {
  //   return (value as BreadcrumbItem).path !== undefined;
  // }
  return (
    <div className="flex items-center">
      <Breadcrumb
        showTooltip={{ opts: { position: "bottom" } }}
        routes={routes}
      />
    </div>
  );
}
