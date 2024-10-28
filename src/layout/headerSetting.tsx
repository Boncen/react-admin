import { IconSetting } from "@douyinfe/semi-icons";
import { Button, SideSheet } from "@douyinfe/semi-ui";
import { useState } from "react";
import { SettingSideSheet } from "./SettingSideSheet";
import { useTranslation } from "react-i18next";

export function HeaderSetting() {
  const [isOpen, setIsOpen] = useState(false);
  const {t} = useTranslation();
  return (
    <>
      <Button
        theme="borderless"
        icon={<IconSetting size="large" />}
        style={{
          color: "var(--semi-color-text-2)",
          marginRight: "12px",
        }}
        onClick={() => setIsOpen(!isOpen)}
      />
      <SideSheet title={t('ui.setting')} visible={isOpen} onCancel={() => setIsOpen(!isOpen)}>
        <SettingSideSheet />
      </SideSheet>
    </>
  );
}
