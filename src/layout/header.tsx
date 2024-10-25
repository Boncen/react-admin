import { IconBell, IconHelpCircle } from "@douyinfe/semi-icons";
import { Avatar, Button, Nav } from "@douyinfe/semi-ui";
import { Breadcrumbs } from "./breadcrumb";

export function Header() {

    return (
        <div>
            <Nav
                mode="horizontal"
                footer={
                    <>
                    <Breadcrumbs ></Breadcrumbs>
                        <Button
                            theme="borderless"
                            icon={<IconBell size="large" />}
                            style={{
                                color: 'var(--semi-color-text-2)',
                                marginRight: '12px',
                            }}
                        />
                        <Button
                            theme="borderless"
                            icon={<IconHelpCircle size="large" />}
                            style={{
                                color: 'var(--semi-color-text-2)',
                                marginRight: '12px',
                            }}
                        />
                        <Avatar color="orange" size="small">
                            YJ
                        </Avatar>
                    </>
                }
            ></Nav>
        </div>
    )
}