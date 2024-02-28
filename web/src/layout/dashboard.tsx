import { Layout, Skeleton } from '@douyinfe/semi-ui';
import Header from '@/layout/header';
import SidebarMenus from '@/layout/menus';
import { Outlet } from 'react-router-dom';

export default function DashboardLayout() {
    const {Content} = Layout
    return (
        <Layout style={{ border: '1px solid var(--semi-color-border)' ,height:'100%' }}>
            <Header/>
            <Layout>
                <SidebarMenus/>
                <Content
                    style={{
                        padding: '24px',
                        backgroundColor: 'var(--semi-color-bg-0)',
                    }}
                >
                  <Outlet/>
                </Content>
            </Layout>
            {/* <Footer
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '20px',
                    color: 'var(--semi-color-text-2)',
                    backgroundColor: 'rgba(var(--semi-grey-0), 1)',
                }}
            >
               <FooterContent/>
            </Footer> */}
        </Layout>
    )
}