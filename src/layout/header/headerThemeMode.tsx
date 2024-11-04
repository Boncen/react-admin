import useSettingStore from "@/store/useSettingStore";
import { IconContrast } from "@douyinfe/semi-icons";
import { Button, Popover } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function ThemeMode() {
  const settingStore = useSettingStore();
  const [isDark, setIsDark] = useState(settingStore.setting.isDarkMode);
  const { t } = useTranslation();

  const body = document.body;

  useEffect(() => {
    if (isDark) {
      if (!body.hasAttribute("theme-mode")) {
        body.setAttribute("theme-mode", "dark");
      }
    } else {
      if (body.hasAttribute("theme-mode")) {
        body.removeAttribute("theme-mode");
      }
    }
  }, [isDark]);

  return (
    <>
      {isDark ? (
        <Popover
          content={<div className="p-2">{t("ui.switchToLightMode")}</div>}
        >
          <Button
            theme="borderless"
            icon={<IconContrast size="large" />}
            style={{
              color: "var(--semi-color-text-2)",
              marginRight: "12px",
            }}
            onClick={() => {
              setIsDark(false);
              settingStore.toggleThemeMode(false);
            }}
          />
        </Popover>
      ) : (
        <Popover
          content={<div className="p-2">{t("ui.switchToDarkMode")}</div>}
        >
          <Button
            theme="borderless"
            icon={<IconContrast size="large" />}
            style={{
              color: "var(--semi-color-text-2)",
              marginRight: "12px",
            }}
            onClick={() => {
              setIsDark(true);
              settingStore.toggleThemeMode(true);
            }}
          />
        </Popover>
      )}
    </>
  );
}
