import { Nav, Image } from "@douyinfe/semi-ui";
import Logo from "@/assets/logo.png";
import { Link } from "react-router-dom";
import "./sider.less";
import { useEffect, useState } from "react";
import api from "@/api";
import useMenuStore from "@/store/useMenuStore";
import { menuItemToNavItem } from "@/utils";
import { useTranslation } from "react-i18next";
import { fullRouteTable, routeMaps } from "@/routes";
import useStatusStore from "@/store/statusStore";
import { trimStartBy } from "@/utils/common";

export function SiderLayout() {
  const menuStore = useMenuStore();
  const { t } = useTranslation();
  const [selectedKeys, setSelectedKeys] = useState<Array<string>>([]);
  const [items, setItems] = useState<any[]>([]);
  const activeRoute = useStatusStore((state)=>state.activeRoute);

  // 获取菜单
  useEffect(() => {
    api.getMenus().then((menus: MenuItem[]) => {
      updateChildNavItem(menus);
      const navitems = menuItemToNavItem(menus, "");
      setItems(navitems);
    });
    const full = fullRouteTable;
    menuStore.updateMenus(full);
  }, []);

  useEffect(()=>{
    const key = activeRoute.toString();
    const currentKey = trimStartBy(key, '/');
    setSelectedKeys([currentKey])
  }, [activeRoute])

  /** 更新子项locale */
  function updateChildNavItem(childs: MenuItem[]) {
    if (childs) {
      for (let index = 0; index < childs.length; index++) {
        const element = childs[index];
        element.locale = t(element.locale);
        if (element.children) {
          updateChildNavItem(element.children);
        }
      }
    }
  }

  return (
    <Nav
      selectedKeys={selectedKeys}
      defaultSelectedKeys={["home"]}
      style={{ maxWidth: 220, height: "100%" }}
      items={items}
      renderWrapper={({ itemElement, props }) => {
        const routerMap = routeMaps;
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
                <div className="flex items-start font-bold">
                  {/* <IconSetting /> */}
                {itemElement}
                </div>
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
