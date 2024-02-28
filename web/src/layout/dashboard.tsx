import { Layout, Skeleton } from '@douyinfe/semi-ui';
import Header from '@/layout/header';
import SidebarMenus from '@/layout/menus';

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
                    <div
                        style={{
                            borderRadius: '10px',
                            border: '1px solid var(--semi-color-border)',
                            height: '376px',
                            padding: '32px',
                        }}
                    >
                        <Skeleton placeholder={<Skeleton.Paragraph rows={2} />} loading={true}>
                            <p>Hi, Bytedance dance dance.</p>
                            <p>Hi, Bytedance dance dance.</p>
                        </Skeleton>
                    </div>
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