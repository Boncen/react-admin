import { TabPane, Tabs } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import useKeepAlive from "@/hooks/use-keepalive";
import { useRouter } from "@/router/hook";
import { useTranslation } from "react-i18next";

export default function MultiTabs() {
  const { push } = useRouter();
  const [defaultKey, setDefaultKey] = useState("");
  const [tabList, setTabList] = useState<{ tab: string; itemKey: string }[]>(
    []
  );
  const { t } = useTranslation();
  const handleTabChange = (key: string) => {
    if (key) {
      push(key);
    }
  };
  const { tabs, activeTabRoutePath, closeTab } = useKeepAlive();

  useEffect(() => {
    tabs.map((x) => {
      const tabTabItem = tabList.find((z) => z.itemKey === x.key);
      if (!tabTabItem) {
        setTabList((prev) => [...prev, { tab: t(x.label), itemKey: x.key }]);
      }
    });
    setDefaultKey(activeTabRoutePath ?? "");
  }, [tabs, tabList, activeTabRoutePath, defaultKey, t]);

  const IndexTab = (key: string) => {
    const tab = tabList.find((x) => x.itemKey == key);
    return tab?.tab;
  };
  const handleCloseTab = (key: string) => {
    closeTab(key);
    const newTabList = [...tabList];
    const closeIndex = newTabList.findIndex((t) => t.itemKey === key);
    newTabList.splice(closeIndex, 1);
    setTabList(newTabList);
  };
  return (
    <Tabs
      type="card"
      activeKey={defaultKey}
      onTabClose={handleCloseTab}
      onChange={(key) => {
        handleTabChange(key);
      }}
    >
      {tabs.map((l) => (
        <TabPane
          itemKey={l.key}
          key={l.key}
          closable={tabList.length > 1}
          tab={IndexTab(l.key)}
        >
          <div className="h-full p-2">{l.children}</div>
        </TabPane>
      ))}
    </Tabs>
  );
}
