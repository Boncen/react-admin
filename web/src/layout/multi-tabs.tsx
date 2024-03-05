import { Divider, Dropdown, TabPane, Tabs } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import useKeepAlive from "@/hooks/use-keepalive";
import { useRouter } from "@/router/hook";
import { useTranslation } from "react-i18next";
import { IconClose } from "@douyinfe/semi-icons";

export default function MultiTabs() {
  const { push } = useRouter();
  const [defaultKey, setDefaultKey] = useState("");
  const [tabList, setTabList] = useState<{ tab: string; itemKey: string }[]>(
    []
  );
  const [hoverItemKey, setHoverItemKey] = useState("");
  const [rightClickItemkey, setRightClickItemkey] = useState("");
  const { t } = useTranslation();
  const handleTabChange = (key: string) => {
    if (key) {
      push(key);
    }
  };
  const {
    tabs,
    activeTabRoutePath,
    closeTab,
    refreshTab,
    closeOthers,
    closeLeft,
    closeRight,
    closeAll,
  } = useKeepAlive();

  useEffect(() => {
    // tabs.map((x) => {
    //   const tabTabItem = tabList.find((z) => z.itemKey === x.key);
    //   if (!tabTabItem) {
    //     setTabList((prev) => [...prev, { tab: t(x.label), itemKey: x.key }]);
    //   }
    // });

    const newList = tabs.map((x) => {
      return { tab: t(x.label), itemKey: x.key };
    });
    setTabList(newList);
    setDefaultKey(activeTabRoutePath ?? "");
  }, [activeTabRoutePath, tabs]);

  const IndexTab = (key: string) => {
    const tab = tabList.find((x) => x.itemKey == key);
    return tab?.tab;
  };
  const handleCloseTab = (key: string) => {
    if (tabList.length < 2) {
      return;
    }
    closeTab(key);
    const newTabList = [...tabList];
    const closeIndex = newTabList.findIndex((t) => t.itemKey === key);
    newTabList.splice(closeIndex, 1);
    setTabList(newTabList);
  };
  const handleOnContextMenu = (itemKey: string, event: any) => {
    event.stopPropagation();
    setRightClickItemkey(itemKey);
  };
  const renderRightClickDropdownMenu = () => {
    return (
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => {
            refreshTab(rightClickItemkey);
            // 
            setHoverItemKey('');
            setHoverItemKey(rightClickItemkey);
          }}
        >
          {t("sys.tab.refresh")}
        </Dropdown.Item>
        <Divider />
        <Dropdown.Item onClick={() => handleCloseTab(rightClickItemkey)}>
          {t("sys.tab.close")}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => closeOthers(rightClickItemkey)}>
          {t("sys.tab.closeOthers")}
        </Dropdown.Item>
        <Dropdown.Item onClick={closeAll}>
          {t("sys.tab.closeAll")}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => closeLeft(rightClickItemkey)}>
          {t("sys.tab.closeLeft")}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => closeRight(rightClickItemkey)}>
          {t("sys.tab.closeRight")}
        </Dropdown.Item>
      </Dropdown.Menu>
    );
  };
  const renderTabBar = () => {
    return (
      <div className="flex border-b border-solid border-gray-200">
        {/* <Space spacing='tight'> */}
        {tabList.map((tab) => (
          <Dropdown
            trigger={"contextMenu"}
            position={"bottomLeft"}
            clickToHide={true}
            render={renderRightClickDropdownMenu()}
          >
            <div
              onContextMenu={(e) => handleOnContextMenu(tab.itemKey, e)}
              onMouseEnter={() => setHoverItemKey(tab.itemKey)}
              onMouseLeave={() => setHoverItemKey("")}
              onClick={() => push(tab.itemKey)}
              className="relative min-w-30 border-solid border-t border-l border-r border-gray-200 px-6 py-1 rounded-t-md flex items-center h-8 mr-1"
              style={{
                background:
                  tab.itemKey === defaultKey
                    ? "#0064fa"
                    : tab.itemKey === hoverItemKey
                    ? "#f6f8fa"
                    : "",
                color: tab.itemKey === defaultKey ? "#fff" : "",
              }}
              key={tab.itemKey}
            >
              <span
                className="cursor-default"
                style={{
                  fontSize: "13px",
                  fontWeight: tab.itemKey === defaultKey ? "bold" : "normal",
                }}
              >
                {t(tab.tab)}
              </span>
              {tab.itemKey === hoverItemKey && tabList.length > 1 && (
                <IconClose
                  size={"small"}
                  className="ml-3 cursor-pointer absolute right-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCloseTab(tab.itemKey);
                  }}
                />
              )}
              {/* <Tag
                style={{
                  fontSize: "13px",
                  fontWeight: tab.itemKey === defaultKey ? "bold" : "normal",
                }}
                color={
                  tab.itemKey === defaultKey
                    ? "blue"
                    : tab.itemKey === hoverItemKey
                    ? "light-blue"
                    : "white"
                }
                onClick={() => push(tab.itemKey)}
                onClose={() => handleCloseTab(tab.itemKey)}
                key={tab.itemKey}
                closable={tab.itemKey === hoverItemKey && tabList.length > 1}
                size={"large"}
              >
                {t(tab.tab)}
              </Tag> */}
            </div>
          </Dropdown>
        ))}
        {/* </Space> */}
      </div>
    );
  };
  return (
    <Tabs
      type="card"
      activeKey={defaultKey}
      onTabClose={handleCloseTab}
      renderTabBar={renderTabBar}
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
          <div key={l.timeStamp} className="h-full p-2">
            {l.children}
          </div>
        </TabPane>
      ))}
    </Tabs>
  );
}
