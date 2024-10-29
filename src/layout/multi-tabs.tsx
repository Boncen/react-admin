import useStatusStore from "@/store/statusStore";
import useMenuStore from "@/store/useMenuStore";
import { TabPane, Tabs } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useMatches, useOutlet } from "react-router-dom";

export function MultiTabs() {
  const matches = useMatches();
  // console.log("MultiTabs matches", matches);
  const outlet = useOutlet();
  // console.log("MultiTabs outlet ,", outlet);
  const [tabs, setTabs] = useState<TabItem[]>([]);
  const menus = useMenuStore((state) => state.menus);
  const { t } = useTranslation();
  const statusStore = useStatusStore();
  const [activeKey, setActiveKey] = useState("/");
  const locate = useLocation();

  // useEffect(() => {
  //   statusStore.updateActiveRoute(activeKey);
  // }, [activeKey, statusStore]);

  useEffect(
    function () {
      // console.log('locate', locate.pathname)
      if (locate.pathname != activeKey) {
        setActiveKey(locate.pathname);
      }
      const match = matches[matches.length - 1];
      if (match) {
        if (tabs.findIndex((z) => z.itemKey == match.pathname) < 0) {
          // 找到路由
          const ids = match.id.split("-");
          let route = menus[Number(ids[0])];
          if (route && route.children) {
            for (let index = 1; index < ids.length; index++) {
              const id = Number(ids[index]);
              if (!isNaN(id)) {
                route = route.children![id] ?? route;
              }
            }
            setTabs(() => [
              ...tabs,
              {
                tab:
                  t(route.meta?.label as string)?.length > 0
                    ? t(route.meta?.label as string)
                    : route.path!,
                closable: true,
                itemKey: match.pathname,
                text: outlet,
              },
            ]);
          }
        }
      }
    },
    [matches]
  );

  function handleCloseTab(tabKey: string) {
    setTabs(tabs.filter((x) => x.itemKey != tabKey));
  }
  function handleTabClick(activeKey: string){
    console.log(activeKey)
    setActiveKey(activeKey);
    statusStore.updateActiveRoute(activeKey);
  }

  return (
    <Tabs type="card" activeKey={activeKey} onTabClose={handleCloseTab} onTabClick={handleTabClick}>
      {tabs.map((t) => (
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
