import { Layout } from "@douyinfe/semi-ui";
import { Footer as FooterLayout } from "./footer";
import { Header as HeaderLayout } from "./header";
import { SiderLayout } from "./sider";
import { MultiTabs } from "./multitabs";
import useSettingStore from "@/store/useSettingStore";
import { Outlet } from "react-router-dom";

export function AdminLayout() {
  const { Header, Footer, Sider, Content } = Layout;
  const setting = useSettingStore((state) => state.setting);

  return (
    <Layout
      style={{ border: "1px solid var(--semi-color-border)" }}
      className="h-screen"
    >
      <Sider style={{ backgroundColor: "var(--semi-color-bg-1)" }}>
        <SiderLayout></SiderLayout>
      </Sider>
      <Layout>
        <Header>
          <HeaderLayout></HeaderLayout>
        </Header>
        <Content
          style={{
            backgroundColor: "var(--semi-color-bg-0)",
          }}
        >
          <div className="h-full shadow-md p-1">
            {setting.isUseMultitab ? <MultiTabs /> : <Outlet />}
          </div>
        </Content>
        <Footer>
          <FooterLayout></FooterLayout>
        </Footer>
      </Layout>
    </Layout>
  );
}
