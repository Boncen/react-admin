import { TabPane, Tabs } from "@douyinfe/semi-ui";
import { useMatches, useOutlet } from "react-router-dom";

export function MultiTabs() {
  const tabList = [
    { tab: "文档", itemKey: "1", text: "文档", closable: true },
    { tab: "快速起步", itemKey: "2", text: "快速起步", closable: true },
    { tab: "帮助", itemKey: "3", text: "帮助" },
  ];
  const matches = useMatches();
  console.log(matches);
  const outlet = useOutlet();
  console.log('outlet', outlet)
  function handleCloseTab(tabKey: string) {
    console.log(tabKey);
  }
  return (
    <Tabs type="card" defaultActiveKey="1" onTabClose={handleCloseTab}>
      {tabList.map((t) => (
        <TabPane
          closable={t.closable}
          tab={t.tab}
          itemKey={t.itemKey}
          key={t.itemKey}
        >
          {t.text}
        </TabPane>
      ))}
    </Tabs>
  );
}
