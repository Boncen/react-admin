import { Layout } from "@douyinfe/semi-ui";
import Header from "@/layout/header";
import SidebarMenus from "@/layout/menus";
import { Outlet } from "react-router-dom";
import MultiTabs from "./multi-tabs";

export default function DashboardLayout() {
  const { Content } = Layout;
  const isMultiTabs = true; //todo read from store
  return (
    <Layout style={{ height: "100%" }}>
      <SidebarMenus />
      <Layout>
        <Header />
        <Content
          style={{
            padding: "2px 5px",
            backgroundColor: "var(--semi-color-bg-0)",
          }}
        >
          {isMultiTabs ? <MultiTabs /> : <Outlet />}
        </Content>
      </Layout>
    </Layout>
  );
}
