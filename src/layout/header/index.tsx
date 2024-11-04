import { Nav } from "@douyinfe/semi-ui";
import { Breadcrumbs } from "../breadcrumb";
import { Notification } from "./notification";
import { LanguageSwitcher } from "./languageSwitcher";
import { HeaderAvatar } from "./headerAvatar";
import { HeaderSetting } from "./headerSetting";
import { ThemeMode } from "./headerThemeMode";

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
                        <ThemeMode />
                        <HeaderSetting />
                      <HeaderAvatar />
                    </>
                }
            ></Nav>
        </div>
    )
}