import { Nav, Button, Avatar } from "@douyinfe/semi-ui";
import {
  IconSemiLogo,
  IconSun,
  IconMoon,
} from "@douyinfe/semi-icons";
import { useState } from "react";

export default function Header() {
  const [isLight, setIsLight] = useState(true);

  const switchDarkLight = () => {
    const body = document.body;
    if (body.hasAttribute("theme-mode")) {
      body.removeAttribute("theme-mode");
      setIsLight(true);
    } else {
      body.setAttribute("theme-mode", "dark");
      setIsLight(false);
    }
  };

  return (
    <div>
      <Nav mode="horizontal" defaultSelectedKeys={["Home"]}>
        <Nav.Header>
          {/* <IconSemiLogo style={{ height: "36px", fontSize: 36 }} /> */}
        </Nav.Header>
        {/* <span
                style={{
                    color: 'var(--semi-color-text-2)',
                }}
            >
                <span
                    style={{
                        marginRight: '24px',
                        color: 'var(--semi-color-text-0)',
                        fontWeight: '600',
                    }}
                >
                    模版推荐
                </span>
                <span style={{ marginRight: '24px' }}>所有模版</span>
                <span>我的模版</span>
            </span> */}
        <Nav.Footer>
          <Button
            theme="borderless"
            icon={
              isLight ? <IconSun size="large" /> : <IconMoon size="large" />
            }
            onClick={switchDarkLight}
            style={{
              marginRight: "12px",
            }}
          />
          {/* <Button
                    theme="borderless"
                    icon={<IconHelpCircle size="large" />}
                    style={{
                        color: 'var(--semi-color-text-2)',
                        marginRight: '12px',
                    }}
                /> */}
          <Avatar color="orange" size="small">
            YJ
          </Avatar>
        </Nav.Footer>
      </Nav>
    </div>
  );
}
