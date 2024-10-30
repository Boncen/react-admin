import useStatusStore from "@/store/statusStore";
import useMenuStore from "@/store/useMenuStore";
import { findMenuByNestedId } from "@/utils";
import { TabPane, Tabs } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useLocation,
  useMatches,
  useNavigate,
  useOutlet,
} from "react-router-dom";

export function MultiTabs() {
  const matches = useMatches();
  const outlet = useOutlet();
  const [tabs, setTabs] = useState<TabItem[]>([]);
  const menus = useMenuStore((state) => state.menus);
  const { t } = useTranslation();
  const statusStore = useStatusStore();
  const [activeKey, setActiveKey] = useState("/");
  const locate = useLocation();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (locate.pathname != activeKey) {
        setActiveKey(locate.pathname);
        statusStore.updateActiveRoute(locate.pathname);
      }
      const match = matches[matches.length - 1];
      if (match) {
        if (tabs.findIndex((z) => z.itemKey == match.pathname) < 0) {
          // 找到路由
          const route = findMenuByNestedId(menus, match.id);
          if (route) {
            // 添加标签
            setTabs(() => [
              ...tabs,
              {
                tab:
                  t(route.meta?.label as string)?.length > 0
                    ? t(route.meta?.label as string)
                    : route.path!,
                closable:
                  route.meta?.closable == undefined ||
                  route.meta?.closable == true,
                itemKey: match.pathname,
                text: outlet,
              },
            ]);
          }
        }
      }
    },
    [matches, menus]
  );
  useEffect(() => {
    if (tabs.length === 0) {
      navigate("/");
    }
  }, [tabs, navigate]);
  /** 关闭标签 */
  function handleCloseTab(tabKey: string) {
    // 激活下一个标签
    if (activeKey == tabKey) {
      const tabIndex = tabs.findIndex((x) => x.itemKey == tabKey);
      if (tabs[tabIndex + 1]) {
        setActiveKey(tabs[tabIndex + 1].itemKey);
      } else if (tabs[tabIndex - 1]) {
        setActiveKey(tabs[tabIndex - 1].itemKey);
      }
    }
    setTabs(() => tabs.filter((x) => x.itemKey != tabKey));
  }
  function handleTabClick(key: string) {
    if (activeKey != key) {
      setActiveKey(key);
      statusStore.updateActiveRoute(key);
      navigate(key);
    }
  }

  return (
    <Tabs
      type="card"
      activeKey={activeKey}
      onTabClose={handleCloseTab}
      onTabClick={handleTabClick}
    >
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
