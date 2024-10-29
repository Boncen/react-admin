import { Nav, Image } from "@douyinfe/semi-ui";
import Logo from "@/assets/logo.png";
import { OnSelectedData } from "@douyinfe/semi-ui/lib/es/navigation";
import { Link, useNavigate } from "react-router-dom";
import "./sider.less";
import { useEffect, useState } from "react";
import api from "@/api";
import useMenuStore from "@/store/useMenuStore";
import { menuItemToNavItem } from "@/utils";
import { useTranslation } from "react-i18next";
import { fullRouteTable, routeMaps } from "@/routes";
import useStatusStore from "@/store/statusStore";

export function SiderLayout() {
  const navigate = useNavigate();
  const menuStore = useMenuStore();
  const { t } = useTranslation();
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const activeRoute = useStatusStore((state)=>state.activeRoute);

  // 获取菜单
  useEffect(() => {
    api.getMenus().then((menus: MenuItem[]) => {
      updateChildNavItem(menus);
      const navitems = menuItemToNavItem(menus, "");
      setMenus(menus);
      setItems(navitems);
      console.log(555, navitems);
    });
    const full = fullRouteTable;
    menuStore.updateMenus(full);
  }, []);

  useEffect(()=>{
    console.log('----> ', activeRoute)
    const key = '/' + activeRoute.toString().replace('_', '/');
    setSelectedKeys([key])
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
  /** 点击导航菜单 */
  function handleSelectNavItem(data: OnSelectedData): void {
    console.log(data);
    if (data.selectedKeys[0]) {
      // 获取到匹配的路由

      const menuItem = menus.find(
        (x) => x.name === data.selectedKeys[0] // 后端返回的菜单的name必须和前端key一致
      );
      // 跳转路由
      if (menuItem && menuItem.path) {
        navigate(menuItem.path);
      }
    }
  }

  return (
    <Nav
      selectedKeys={selectedKeys}
      onSelect={handleSelectNavItem}
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
