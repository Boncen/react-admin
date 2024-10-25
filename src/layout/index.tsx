import { Layout } from "@douyinfe/semi-ui";
import { Outlet } from "react-router-dom";
import { Footer as FooterLayout } from "./footer";
import { Header as HeaderLayout } from "./header";
import { SiderLayout } from "./sider";


export function AdminLayout() {
    const { Header, Footer, Sider, Content } = Layout;
    return (
        <Layout style={{ border: '1px solid var(--semi-color-border)' }} className="h-screen">
            <Sider style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
                <SiderLayout></SiderLayout>
            </Sider>
            <Layout>
                <Header style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
                    <HeaderLayout></HeaderLayout>
                </Header>
                <Content
                    style={{
                        padding: '10px',
                        backgroundColor: 'var(--semi-color-bg-0)',
                    }}
                >
                    <div
                        style={{
                            borderRadius: '10px',
                            border: '1px solid var(--semi-color-border)',
                            height: '376px',
                            padding: '12px',
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
                <Footer
                   
                >
                    <FooterLayout></FooterLayout>
                </Footer>
            </Layout>
        </Layout>
    )
}