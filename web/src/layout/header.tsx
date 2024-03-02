import { Nav, Button, Avatar, Dropdown } from "@douyinfe/semi-ui";
import { IconSun, IconMoon } from "@douyinfe/semi-icons";
import { useEffect, useState } from "react";
import MyBreadcrumb from "./breadcrumb";
import { useDarkMode, useToggleDarkMode } from "@/store/settingsStore";
import PageMapper from "@/utils/page-mapper";
import { useRouter } from "@/router/hook";

export default function Header() {
  const isDark = useDarkMode();
  const { push } = useRouter();

  const [isDarkMode, setIsDarkMode] = useState(isDark);
  useEffect(() => {
    changeTheme();
  });
  const toggleDark = useToggleDarkMode();
  const switchDarkLight = () => {
    setIsDarkMode(!isDarkMode);
    toggleDark(!isDark);
    changeTheme();
  };
  const changeTheme = () => {
    const body = document.body;
    if (!isDark) {
      body.removeAttribute("theme-mode");
    } else {
      body.setAttribute("theme-mode", "dark");
    }
  };
  
  function handleLogout(): void {
    push(PageMapper.Login)
  }

  return (
    <div>
      <Nav
        mode="horizontal"
        defaultSelectedKeys={["Home"]}
        style={{ border: "none" }}
      >
        <Nav.Header>
          <MyBreadcrumb />
        </Nav.Header>
        <Nav.Footer>
          <Button
            theme="borderless"
            icon={
              isDarkMode ? <IconSun size="large" /> : <IconMoon size="large" />
            }
            onClick={switchDarkLight}
            style={{
              marginRight: "12px",
            }}
          />
          <Dropdown
            trigger={"hover"}
            position={"bottomRight"}
            render={
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => push(PageMapper.MyInfo)}>
                  个人信息
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>退出登录</Dropdown.Item>
              </Dropdown.Menu>
            }
          >
            <Avatar color="pink" size="small">
              HBC
            </Avatar>
          </Dropdown>
        </Nav.Footer>
      </Nav>
    </div>
  );
}
