import useSettingStore from "@/store/useSettingStore";
import { List, Switch } from "@douyinfe/semi-ui";
import { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

export function SettingSideSheet() {
  const settingStore = useSettingStore();
  const {t} = useTranslation();
  const [data, setData] = useState<
    Array<{ title: string; key: string; value: boolean }>
  >(() => [
    {
      title: "ui.isUseMultitab",
      key: "isUseMultitab",
      value: settingStore.setting.isUseMultitab,
    },
    {
      title: "ui.isUseBreadcrumb",
      key: "isUseBreadcrumb",
      value: settingStore.setting.isUseBreadcrumb,
    },
  ]);
  console.log(data, settingStore.setting);
  // 使用 useMemo 避免重复创建相同的 data 数组
  const memoizedData = useMemo(
    () => [
      {
        title: "ui.isUseMultitab",
        key: "isUseMultitab",
        value: settingStore.setting.isUseMultitab,
      },
      {
        title: "ui.isUseBreadcrumb",
        key: "isUseBreadcrumb",
        value: settingStore.setting.isUseBreadcrumb,
      },
    ],
    [settingStore.setting.isUseBreadcrumb, settingStore.setting.isUseMultitab]
  );

  useEffect(() => {
    setData(memoizedData);
  }, [memoizedData]);

  const handleChangeSetting = (
    item: { title: string; key: string; value: boolean },
    checked: boolean
  ): void => {
    const updatedData = data.map((m) =>
      m.key === item.key ? { ...m, value: checked } : m
    );
    setData(updatedData);

    const actions: Record<string, (val: boolean) => void> = {
      isUseMultitab: settingStore.toggleMultiTab,
      isUseBreadcrumb: settingStore.setIsUseBreadcrumb,
    };

    actions[item.key](checked);
  };

  return (
    <div>
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            main={
              <div>
                <span>{t(item.title)}</span>
              </div>
            }
            extra={
              <Switch
                checked={item.value}
                onChange={(v) => handleChangeSetting(item, v)}
              />
            }
          />
        )}
      />
    </div>
  );
}
