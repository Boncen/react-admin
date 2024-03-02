import { Layout, Nav } from "@douyinfe/semi-ui";
import { IconHome, IconSemiLogo, IconSetting, IconUser } from "@douyinfe/semi-icons";
import PageMapper from "@/utils/page-mapper";
import { useEffect, useState } from "react";
import { useRouter } from "@/router/hook";
// import Logo from "./logo";
import useKeepAlive from "@/hooks/use-keepalive";

const menus: any[] = [
  {
    itemKey: "setting",
    text: "设置",
    icon: <IconSetting size="large" />,
    items: [
      {
        itemKey: PageMapper.Users,
        text: "用户管理",
        icon: <IconUser size="large" />,
      },
      {
        itemKey: PageMapper.Roles,
        text: "角色管理",
        icon: <IconUser size="large" />,
      },
      {
        itemKey: PageMapper.Settings,
        text: "系统配置",
        icon: <IconUser size="large" />,
      },
    ],
  },
  {
    itemKey: "sample",
    text: "示例",
    icon: <IconSetting size="large" />,
    items: [
      {
        itemKey: "/sample/s1",
        text: "s1",
      },
      {
        itemKey: "/sample/s2",
        text: "s2",
      },
    ],
  },
];

export default function SidebarMenus() {
  const { Sider } = Layout;
  const router = useRouter();
  const [selectedKeys, setSelectedKeys] = useState([""]);
  const { activeTabRoutePath } = useKeepAlive();

  useEffect(() => {
    setSelectedKeys([activeTabRoutePath ?? ""]);
  }, [activeTabRoutePath]);

  const handleClickNavMenu = (data: {
    itemKey?: React.ReactText | undefined;
    domEvent?: MouseEvent | undefined;
    isOpen?: boolean | undefined;
  }) => {
    if (data.itemKey && (data.itemKey as string).indexOf("/") === 0) {
      router.push(data.itemKey as string);
      setSelectedKeys([data.itemKey as string]);
    }
  };

  return (
    // <section className="flex flex-col h-full">
    <Sider >
      {/* <Logo /> */}
      <Nav
      header={{
        logo: <IconSemiLogo style={{ height: '36px', fontSize: 36 }} />,
        text: 'Admin 后台'
    }}
        style={{ height: "100%" }}
        defaultSelectedKeys={["Home"]}
        selectedKeys={selectedKeys}
        items={[
          { itemKey: "/", text: "首页", icon: <IconHome size="large" /> },
          ...menus,
        ]}
        onClick={(data) => handleClickNavMenu(data)}
        footer={{
          collapseButton: true,
        }}
      />
    </Sider>
    // </section>
  );
}
