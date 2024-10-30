import useSettingStore from "@/store/useSettingStore";
import { LocalEnum } from "@/types/enum";
import { IconLanguage } from "@douyinfe/semi-icons";
import { Button, Dropdown } from "@douyinfe/semi-ui";
import { useTranslation } from "react-i18next";

export function LanguageSwitcher() {
  const {setting, updateLanguage} = useSettingStore();
  const {  i18n } = useTranslation();

  function handleChangeLanguage(key: string) {
    i18n.changeLanguage(key);
    updateLanguage(key);
  }

  return (
    <Dropdown
      trigger={"click"}
      clickToHide={true}
      render={
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => handleChangeLanguage(LocalEnum["zh-CN"])}
            className={setting.lang === LocalEnum["zh-CN"] ? "text-blue-500	" : "	"}
          >
            简体中文
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              handleChangeLanguage(LocalEnum["en-US"]);
            }}
            className={setting.lang === LocalEnum["en-US"] ? "text-blue-500	" : ""}
          >
            English
          </Dropdown.Item>
        </Dropdown.Menu>
      }
    >
      <Button
        theme="borderless"
        icon={
          <IconLanguage
            style={{ color: "var(--semi-color-text-0)" }}
            size="large"
          />
        }
        style={{
          marginRight: "12px",
        }}
      />
    </Dropdown>
  );
}
