import { IconHome, IconSetting } from "@douyinfe/semi-icons";
import { Nav, Image } from "@douyinfe/semi-ui";
import Logo from "@/assets/logo.png";
import { OnSelectedData } from "@douyinfe/semi-ui/lib/es/navigation";
import { useNavigate } from "react-router-dom";
import useMenuStore from "@/store/useMenuStore";
import './sider.less'

export function SiderLayout() {
  const navigate = useNavigate();
  const menuItems = useMenuStore((state) => state.menus);
  
  function handleSelectNavItem(data: OnSelectedData): void {
    if (data.selectedKeys[0]) {
      // 获取到匹配的路由
      const menuItem = menuItems.find(x=>x.meta.key === data.selectedKeys[0]);
      // 跳转路由
      if (menuItem && menuItem.path) {
        navigate(menuItem.path);
      }
    }
  }

  return (
    <Nav
      onSelect={handleSelectNavItem}
      defaultSelectedKeys={["Home"]}
      style={{ maxWidth: 220, height: "100%" }}
      items={[
        { itemKey: "Home", text: "首页", icon: <IconHome /> },
        {
          itemKey: "System",
          text: "系统管理",
          icon: <IconSetting />,
          items: ["haha", "xixi"],
        },
      ]}
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
