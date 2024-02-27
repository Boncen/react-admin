import { Layout, Skeleton } from '@douyinfe/semi-ui';
import Header from '@/layout/header';
import SidebarMenus from '@/layout/menus';
// import FooterContent from '@/layout/footer';

export default function App () {
    const {  Content } = Layout;
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
                    {/* <Breadcrumb
                        style={{
                            marginBottom: '24px',
                        }}
                        routes={['首页', '当这个页面标题很长时需要省略', '上一页', '详情页']}
                    /> */}
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
    );
}