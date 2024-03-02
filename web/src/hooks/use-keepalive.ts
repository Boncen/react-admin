import { RouteMeta } from "#/router";
import { useMatchRouteMeta, useRouter } from "@/router/hook";
import { useEffect, useState } from "react";

export type KeepAliveTab = RouteMeta & {
  children: any;
};

export default function useKeepAlive() {
  const { push } = useRouter();
  const [tabs, setTabs] = useState<KeepAliveTab[]>([]);
  const [activeTabRoutePath, setActiveTabRoutePath] = useState<string>();
  const currentRouteMeta = useMatchRouteMeta();

  const closeTab = (key: string) => {
    if (!key) {
      return;
    }
    const index = tabs.findIndex((x) => x.key === key);
    if (index < 0) return;
    const tabsCopy = tabs;
    tabsCopy.splice(index, 1);
    setTabs(tabsCopy);
    setNextActiveTab(index);
  };
  const closeOthers = () => {};
  const closeLeft = () => {};
  const closeRight = () => {};
  const refreshTab = () => {};
  /**
   * 自动选择下一个tab,默认选中左侧的tab
   */
  const setNextActiveTab = (closeIndex?: number) => {
    let next = null;
    console.log(closeIndex, tabs, next);
    if (closeIndex != null && closeIndex > -1) {
      next = tabs.at(closeIndex!);
      console.log(closeIndex, tabs, next);
      
      if (!next) {
        next = tabs.at(closeIndex! + 1);
      }
    } 
    if (!next) {
      next = tabs.at(-1);
    }
    if (next?.key) {
      push(next!.key);
    }
  };

  useEffect(() => {
    console.log(1, currentRouteMeta);
    
    if (!currentRouteMeta) {
      return;
    }
    const tab = tabs.find((x) => x.key === currentRouteMeta?.key);
    if (!tab) {
      setTabs((prev) => [
        ...prev,
        {
          ...currentRouteMeta!,
          children: currentRouteMeta!.outlet,
          timeStamp: getKey(),
        },
      ]);
    }
    setActiveTabRoutePath(currentRouteMeta.key);
  }, [currentRouteMeta, tabs]);

  return {
    tabs,
    activeTabRoutePath,
    closeTab,
    closeLeft,
    closeOthers,
    closeRight,
    refreshTab,
  };
}
function getKey() {
  return new Date().getTime().toString();
}
