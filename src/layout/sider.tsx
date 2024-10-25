import { IconHome, IconSemiLogo, IconSetting, IconUserGroup } from "@douyinfe/semi-icons";
import { Nav, NavItem } from "@douyinfe/semi-ui";

export function SiderLayout() {
NavItem
    return (
        <Nav
            defaultSelectedKeys={['Home']}
            style={{ maxWidth: 220, height: '100%' }}
            items={[
                { itemKey: 'Home', text: '首页', icon: <IconHome size="large" /> },
                {
                    itemKey: 'System', text: '系统管理', icon: <IconSetting size="large" />, 
                   
                },
            ]}
            header={{
                logo: <IconSemiLogo style={{ fontSize: 36 }} />,
                text: 'Semi Design',
            }}
            footer={{
                collapseButton: true,
            }}
        />
    )
}