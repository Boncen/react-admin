import useSettingStore from "@/store/useSettingStore";
import { List, Switch } from "@douyinfe/semi-ui";
import { useEffect, useState, useMemo } from "react";

export function SettingSideSheet() {
  const settingStore = useSettingStore();
  const [data, setData] = useState<
    Array<{ title: string; key: string; value: boolean }>
  >(() => [
    {
      title: "是否使用多标签页",
      key: "isUseMultitab",
      value: settingStore.setting.isUseMultitab,
    },
    {
      title: "是否使用面包屑",
      key: "isUseBreadcrumb",
      value: settingStore.setting.isUseBreadcrumb,
    },
  ]);
  console.log(data, settingStore.setting);
  // 使用 useMemo 避免重复创建相同的 data 数组
  const memoizedData = useMemo(
    () => [
      {
        title: "是否使用多标签页",
        key: "isUseMultitab",
        value: settingStore.setting.isUseMultitab,
      },
      {
        title: "是否使用面包屑",
        key: "isUseBreadcrumb",
        value: settingStore.setting.isUseBreadcrumb,
      },
    ],
    [settingStore]
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
    <div
      style={{
        padding: "1rem",
        border: "1px solid var(--semi-color-border)",
        margin: "1rem",
      }}
    >
      <List
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            main={
              <div>
                <span
                  style={{ color: "var(--semi-color-text-0)", fontWeight: 500 }}
                >
                  {item.title}
                </span>
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
