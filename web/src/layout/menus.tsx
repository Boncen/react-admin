import { Layout, Nav } from "@douyinfe/semi-ui";
import { IconHome, IconSetting, IconUser } from "@douyinfe/semi-icons";
import PageMapper from "@/utils/page-mapper";
import { useState } from "react";
import { useRouter } from "@/router/hook";
import Logo from "./logo";

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
  const handleClickNavMenu = (data: {
    itemKey?: React.ReactText | undefined;
    domEvent?: MouseEvent | undefined;
    isOpen?: boolean | undefined;
  }) => {
    console.log(data);
    if (data.itemKey && (data.itemKey as string).indexOf("/") === 0) {
      console.log(data.itemKey);
      router.push(data.itemKey as string);
      setSelectedKeys([data.itemKey as string]);
    }
  };

  return (
    // <section className="flex flex-col h-full">
    <Sider>
      <Logo />
      <Nav
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
