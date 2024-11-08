import useStatusStore from "@/store/statusStore";
import useMenuStore from "@/store/useMenuStore";
import { findMenuByNestedId } from "@/utils/routeMenu";
import { getTimestamp } from "@/utils/common";
import { IconClose } from "@douyinfe/semi-icons";
import { Divider, Dropdown, TabPane, Tabs, Toast } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useLocation,
  useMatches,
  useNavigate,
  useOutlet,
} from "react-router-dom";
import { MultiTabContext } from "./multiTabContext";

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
  const [rightClickItemkey, setRightClickItemkey] = useState("");
  const [hoverItemKey, setHoverItemKey] = useState("");

  useEffect(
    function () {
      const match = matches[matches.length - 1];
      if (match) {
        console.log("match ---> ", match, tabs);
        let tab = tabs.find((z) => z.itemKey == match.pathname);
        if (!tab) {
          // 找到路由
          const route = findMenuByNestedId(menus, match.id);
          if (route) {
            tab = {
              tab:
                t(route.meta?.label as string)?.length > 0
                  ? t(route.meta?.label as string)
                  : route.path!,
              closable:
                route.meta?.closable == undefined ||
                route.meta?.closable == true,
              itemKey: match.pathname,
              text: outlet,
              contentKey: getTimestamp(),
            };
            // 添加标签
            setTabs([...tabs, tab]);
          }
        }
        document.title = document.title.split("-")[0] + " - " + tab!.tab;
        if (locate.pathname != activeKey) {
          setActiveKey(locate.pathname);
          statusStore.updateActiveRoute(locate.pathname);
        }
      }
    },
    [matches, menus]
  );
  useEffect(() => {
    if (tabs.length > 0) {
      // 激活下一个标签
      const tabIndex = tabs.findIndex((x) => x.itemKey == activeKey);
      if (tabIndex == -1) {
        navigate(tabs.at(-1)!.itemKey);
      } else {
        setActiveKey(activeKey);
      }
    }
  }, [navigate, tabs]);

  /** 关闭标签 */
  function handleCloseTab(tabKey: string) {
    if (tabs.length <= 1) {
      Toast.info('留一个😃');
      return;
    }
    setTabs(() => tabs.filter((x) => x.itemKey != tabKey));
    if (activeKey == tabKey) {
      setActiveKey("");
    }
  }
  function handleTabClick(key: string) {
    if (activeKey != key) {
      statusStore.updateActiveRoute(key);
      navigate(key);
    }
  }
  const handleOnContextMenu = (itemKey: string, event: any) => {
    event.stopPropagation();
    setRightClickItemkey(itemKey);
  };

  function DropdownMenu() {
    return (
      <Dropdown.Menu>
        <Dropdown.Item
          key={"refreshTab"}
          onClick={() => onClickDrawdownItem({ type: "refresh" })}
        >
          {t("ui.refresh")}
        </Dropdown.Item>
        <Divider />
        <Dropdown.Item
          key={"closeTab"}
          onClick={() => onClickDrawdownItem({ type: "close" })}
        >
          {t("ui.close")}
        </Dropdown.Item>
        <Dropdown.Item
          key={"closeOthers"}
          onClick={() => onClickDrawdownItem({ type: "closeOthers" })}
        >
          {t("ui.closeOthers")}
        </Dropdown.Item>
        <Dropdown.Item
          key={"closeAll"}
          onClick={() => onClickDrawdownItem({ type: "closeAll" })}
        >
          {t("ui.closeAll")}
        </Dropdown.Item>
        <Dropdown.Item
          key={"closeLeft"}
          onClick={() => onClickDrawdownItem({ type: "closeLeft" })}
        >
          {t("ui.closeLeft")}
        </Dropdown.Item>
        <Dropdown.Item
          key={"closeRight"}
          onClick={() => onClickDrawdownItem({ type: "closeRight" })}
        >
          {t("ui.closeRight")}
        </Dropdown.Item>
      </Dropdown.Menu>
    );
  }

  const onClickDrawdownItem = (ev: { type: string; payload?: any }) => {
    const tabIndex = tabs.findIndex((x) => x.itemKey == rightClickItemkey);
    switch (ev.type) {
      case "refresh":
        setTabs(
          tabs.map((tab) => {
            if (tab.itemKey == rightClickItemkey) {
              return { ...tab, contentKey: getTimestamp() };
            } else {
              return tab;
            }
          })
        );
        break;
      case "close":
        setTabs(tabs.filter((x) => x.itemKey != rightClickItemkey));
        break;
      case "closeOthers":
        setTabs(tabs.filter((x) => x.itemKey == rightClickItemkey));
        break;
      case "closeAll":
        setTabs([]);
        break;
      case "closeLeft":
        // setTabs(tabs.splice(0, tabIndex - 1));
        setTabs(tabs.splice(tabIndex, tabs.length));
        break;
      case "closeRight":
        setTabs(tabs.splice(0, tabIndex + 1));
        break;
      default:
        break;
    }
  };

  const renderTabBar = () => {
    return (
      <div
        className="flex border-b border-solid"
        style={{ borderColor: "var(--semi-color-fill-0)" }}
      >
        {tabs.map((tab) => (
          <Dropdown
            key={tab.itemKey}
            trigger={"contextMenu"}
            position={"bottomLeft"}
            clickToHide={true}
            render={DropdownMenu()}
          >
            <div
              onContextMenu={(e) => handleOnContextMenu(tab.itemKey, e)}
              // onMouseEnter={() => setHoverItemKey(tab.itemKey)}
              // onMouseLeave={() => setHoverItemKey("")}
              onClick={() => handleTabClick(tab.itemKey)}
              className="relative min-w-30 border-solid border-t border-l border-r px-6 py-1 rounded-t-md flex items-center h-8 mr-1"
              style={{
                background:
                  tab.itemKey === activeKey
                    ? "#3DAEE9"
                    : tab.itemKey === hoverItemKey
                    ? "var(--semi-color-fill-0)"
                    : "",
                color:
                  tab.itemKey === activeKey
                    ? "#fff"
                    : "var(--semi-color-text-0)",
                borderColor: "var(--semi-color-fill-0)",
              }}
              key={tab.itemKey}
            >
              <span
                className="cursor-default"
                style={{
                  fontSize: "13px",
                  fontWeight: tab.itemKey === activeKey ? "bold" : "normal",
                }}
              >
                {tab.tab}
              </span>
              {
              // tab.itemKey === hoverItemKey && tabs.length > 1 && 
              (
                <IconClose
                  size={"small"}
                  className="ml-3 cursor-pointer absolute right-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCloseTab(tab.itemKey);
                  }}
                />
              )}
            </div>
          </Dropdown>
        ))}
      </div>
    );
  };

  /** 关闭当前页 */
  const handleCloseCurrentTab = () => {
    handleCloseTab(activeKey);
  };

  /** 设置当前tab标题 */
  const setTabTitle = (title: string) => {
    if (activeKey) {
      setTabs(
        tabs.map((t) => {
          if (t.itemKey == activeKey) {
            return {
              ...t,
              tab: title,
            };
          } else {
            return t;
          }
        })
      );
    }
  };

  return (
    <Tabs
      type="card"
      activeKey={activeKey}
      onTabClose={handleCloseTab}
      onTabClick={handleTabClick}
      renderTabBar={renderTabBar}
    >
      {tabs.map((t) => (
        <TabPane
          closable={t.closable}
          tab={t.tab}
          itemKey={t.itemKey}
          key={t.itemKey}
        >
          <div key={t.contentKey}>
            <MultiTabContext.Provider
              value={{ closeCurrentTab: handleCloseCurrentTab, setTabTitle: setTabTitle }}
            >
              {t.text}
            </MultiTabContext.Provider>
          </div>
        </TabPane>
      ))}
    </Tabs>
  );
}
