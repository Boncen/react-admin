import { IconHelpCircle } from "@douyinfe/semi-icons";
import { Avatar, Button, Nav } from "@douyinfe/semi-ui";
import { Breadcrumbs } from "./breadcrumb";
import { Notification } from "./notification";
import { LanguageSwitcher } from "./languageSwitcher";

export function Header() {

    return (
        <div >
            <Nav
            className="h-[40px]"
                mode="horizontal"
                header={
                    <Breadcrumbs ></Breadcrumbs>
                }
                footer={
                    <>
                        <Notification />
                        <LanguageSwitcher />
                        <Button
                            theme="borderless"
                            icon={<IconHelpCircle size="large" />}
                            style={{
                                color: 'var(--semi-color-text-2)',
                                marginRight: '12px',
                            }}
                        />
                        <Avatar color="orange" size="small">
                            Bc
                        </Avatar>
                    </>
                }
            ></Nav>
        </div>
    )
}