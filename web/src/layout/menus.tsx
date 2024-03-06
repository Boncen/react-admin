import { Layout, Nav } from "@douyinfe/semi-ui";
import { IconSemiLogo } from "@douyinfe/semi-icons";
import { Icon } from '@iconify/react';
import { useEffect, useState } from "react";
import { useRouter } from "@/router/hook";
// import Logo from "./logo";
import useKeepAlive from "@/hooks/use-keepalive";
import { usePermissionRoutes } from "@/router/hook/use-permission-routes";
import { useTranslation } from "react-i18next";
import { NavItem } from "#/entity";
import { AppRouteObject } from "#/router";

// const menus: NavItem[] = [
//   {
//     itemKey: "setting",
//     text: "设置",
//     icon: <IconSetting size="large" />,
//     items: [
//       {
//         itemKey: PageMapper.Users,
//         text: "用户管理",
//         icon: <IconUser size="large" />,
//       },
//       {
//         itemKey: PageMapper.Roles,
//         text: "角色管理",
//         icon: <IconUser size="large" />,
//       },
//       {
//         itemKey: PageMapper.Settings,
//         text: "系统配置",
//         icon: <IconUser size="large" />,
//       },
//     ],
//   },
//   {
//     itemKey: "sample",
//     text: "示例",
//     icon: <IconSetting size="large" />,
//     items: [
//       {
//         itemKey: "/sample/s1",
//         text: "s1",
//       },
//       {
//         itemKey: "/sample/s2",
//         text: "s2",
//       },
//     ],
//   },
// ];

function permission2Menu(permissions: AppRouteObject[], parentItem?: AppRouteObject):NavItem[] {
  const navItems: NavItem[] = [];
  for (let index = 0; index < permissions.length; index++) {
    const p = permissions[index];
    if (!p.meta?.label || p.meta.hideMenu) {
      continue;
    }
    navItems.push( {
      itemKey: parentItem ? `/${parentItem.path}/${p.path}` : `${p.path}`,
      text: p.meta?.label,
      icon: <Icon icon={p.meta?.icon ?? ''} width={22} height={22}/>,
      items: permission2Menu(p.children ?? [], p)
    } as NavItem)
  }
  return navItems;
}

export default function SidebarMenus() {
  const { Sider } = Layout;
  const router = useRouter();
  const [selectedKeys, setSelectedKeys] = useState([""]);
  const { activeTabRoutePath } = useKeepAlive();
  const {t} = useTranslation();
  const permissions = usePermissionRoutes();
  const navItems = permission2Menu(permissions);
  
  useEffect(() => {
    setSelectedKeys([activeTabRoutePath ?? ""]);
  }, [activeTabRoutePath]);

  const handleClickNavMenu = (data: {
    itemKey?: React.ReactText | undefined;
    domEvent?: MouseEvent | undefined;
    isOpen?: boolean | undefined;
  }) => {
    console.log('click menu item:', data);
    
    if (data.itemKey && (data.itemKey as string).indexOf("/") === 0) {
      router.push(data.itemKey as string);
      setSelectedKeys([data.itemKey as string]);
    }
  };

  return (
    <Sider >
      <Nav
      className="overflow-y-auto"
      header={{
        logo: <IconSemiLogo style={{ height: '36px', fontSize: 36 }} />,
        text: `${t('appName')}`
    }}
        style={{ height: "100%" }}
        defaultSelectedKeys={["Home"]}
        selectedKeys={selectedKeys}
        items={[
          // { itemKey: "/", text: `${t('common.homePage')}`, icon: <IconHome size="large" /> },
          ...navItems,
        ]}
        onClick={(data) => handleClickNavMenu(data)}
        footer={{
          collapseButton: false,
        }}
      />
    </Sider>
  );
}
