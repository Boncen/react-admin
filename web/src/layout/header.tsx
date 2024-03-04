import {
  Nav,
  Button,
  Avatar,
  Dropdown,
  Space,
  SideSheet,
} from "@douyinfe/semi-ui";
import {
  IconSun,
  IconMoon,
  IconLanguage,
  IconSetting,
} from "@douyinfe/semi-icons";
import { useEffect, useState } from "react";
import MyBreadcrumb from "./breadcrumb";
import { useDarkMode, useToggleDarkMode } from "@/store/settingsStore";
import PageMapper from "@/utils/page-mapper";
import { useRouter } from "@/router/hook";
import { useUserActions } from "@/store/userStore";
import { changeTheme } from "@/router/utils";

export default function Header() {
  const isDark = useDarkMode();
  const { push } = useRouter();
  const { clearUserInfoAndToken } = useUserActions();
  const [isDarkMode, setIsDarkMode] = useState(isDark);
  const [showSideSheet, setShowSideSheet] = useState(false);

  useEffect(() => {
    changeTheme(isDark);
  });
  const toggleDark = useToggleDarkMode();
  const switchDarkLight = () => {
    setIsDarkMode(!isDarkMode);
    toggleDark(!isDark);
    changeTheme(isDark);
  };

  function handleLogout(): void {
    clearUserInfoAndToken();
    push(PageMapper.Login);
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
          {/* <div className="mr-3 flex items-center justify-center"> */}
          <Space spacing="medium">
            <Dropdown
              trigger={"click"}
              render={
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => push(PageMapper.MyInfo)}>
                    简体中文
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>English</Dropdown.Item>
                </Dropdown.Menu>
              }
            >
              <Button
                theme="borderless"
                icon={
                  <IconLanguage
                    style={{ color: "var(--semi-color-text-0)" }}
                    size="large"
                  />
                }
                style={{
                  marginRight: "12px",
                }}
              />
            </Dropdown>
            <Button
              theme="borderless"
              icon={
                isDarkMode ? (
                  <IconSun size="large" />
                ) : (
                  <IconMoon size="large" />
                )
              }
              onClick={switchDarkLight}
              style={{
                marginRight: "12px",
              }}
            />
            <Button
              theme="borderless"
              icon={
                <IconSetting style={{ color: "var(--semi-color-text-0)" }} size="large" />
              }
              onClick={() => setShowSideSheet(!showSideSheet)}
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
          </Space>
          <SideSheet title="设置" visible={showSideSheet} onCancel={()=>setShowSideSheet(false)}>
            <p>This is the content of a basic sidesheet.</p>
            <p>Here is more content...</p>
          </SideSheet>
          {/* </div> */}
        </Nav.Footer>
      </Nav>
    </div>
  );
}
