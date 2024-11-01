import { Nav, Image } from "@douyinfe/semi-ui";
import Logo from "@/assets/logo.png";
import { Link } from "react-router-dom";
import "./sider.less";
import { useEffect, useState } from "react";
import api from "@/api";
import useMenuStore from "@/store/useMenuStore";
import { menuItemToNavItem } from "@/utils/routeMenu";
import { useTranslation } from "react-i18next";
import { fullRouteTable, routeMaps } from "@/routes";
import useStatusStore from "@/store/statusStore";
import { trimStartBy } from "@/utils/common";
import useSettingStore from "@/store/useSettingStore";
import { iconMaps } from "./menuIconMap";

export function SiderLayout() {
  const menuStore = useMenuStore();
  const { t,i18n } = useTranslation();
  const setting = useSettingStore((state) => state.setting);
  const [selectedKeys, setSelectedKeys] = useState<Array<string>>([]);
  const [items, setItems] = useState<NavItemPropsWithItemsExt[]>([]);
  const activeRoute = useStatusStore((state) => state.activeRoute);


  const full = fullRouteTable;
  menuStore.updateMenus(full);

  // 获取菜单
  useEffect(() => {
    console.log('sider running', setting.lang);
    api.getMenus().then((menus: MenuItem[]) => {
      // setRawMenus(menus);
      const navitems = menuItemToNavItem(menus, "");

      // 添加首页
      if (navitems && !navitems?.find((x) => x.itemKey == "home")) {
        navitems.unshift({
          itemKey: "home",
          text: "",
          locale: "ui.home",
        });
      }
      // console.log(navitems);
      const _items = updateChildNavItem(navitems ?? [])
      setItems(_items);
    });
 
  }, []);


  // const updateChildNavItem = useCallback(
    /** 更新子项locale */
  function updateChildNavItem(
    childs: NavItemPropsWithItemsExt[]
  ): NavItemPropsWithItemsExt[] {
    if (childs) {
      const copy: NavItemPropsWithItemsExt[] = [...childs];
      for (let index = 0; index < copy.length; index++) {
        const element = copy[index];
        element.text = t(element.locale as string);
        // if (element.icon) {
        element.icon = iconMaps[element.itemKey!]; // ?? <IconMenu />;
        // }
        if (element.items) {
          updateChildNavItem(element.items as NavItemPropsWithItemsExt[]);
        }
      }
      return copy;
    }
    return childs;
  }
  //   [t]
  // );

  /** 响应语言变化 */
  useEffect(() => {
    i18n.changeLanguage(setting.lang ?? "");
    setItems(updateChildNavItem(items ?? []));
  }, [setting.lang, i18n]);

  useEffect(() => {
    const key = activeRoute.toString();
    const currentKey = key == "/" || !key ? "home" : trimStartBy(key, "/");
    setSelectedKeys([currentKey]);
  }, [activeRoute]);

  return (
    <Nav
      selectedKeys={selectedKeys}
      defaultSelectedKeys={["home"]}
      style={{ maxWidth: 220, height: "100%" }}
      items={items}
      renderWrapper={({ itemElement, props }) => {
        const routerMap = routeMaps;
        // console.log(routerMap)
        return (
          <>
            {
              // eslint-disable-next-line react/prop-types
              routerMap[props.itemKey!] ? (
                <Link
                  style={{ textDecoration: "none" }}
                  // eslint-disable-next-line react/prop-types
                  to={routerMap[props.itemKey!]}
                >
                  {itemElement}
                </Link>
              ) : (
                // 父级菜单
                <div className="">{itemElement}</div>
              )
            }
          </>
        );
      }}
      header={{
        logo: <Image width={35} height={35} src={Logo} />,
        text: "React Admin",
      }}
      footer={{
        collapseButton: true,
      }}
    />
  );
}
