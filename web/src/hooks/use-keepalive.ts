import { RouteMeta } from "#/router";
import { useMatchRouteMeta, useRouter } from "@/router/hook";
import { useEffect, useState } from "react";

export type KeepAliveTab = RouteMeta & {
  children: any;
};

export default function useKeepAlive() {
  const { push } = useRouter();
  // tabs
  const [tabs, setTabs] = useState<KeepAliveTab[]>([]);
  const [activeTabRoutePath, setActiveTabRoutePath] = useState<string>();
  const currentRouteMeta = useMatchRouteMeta();

  const closeTab = (key: string) => {
    if (!key) {
      return;
    }
    const index = tabs.findIndex(x=>x.key === key);
    if(index < 0) return;
    const tabsCopy = tabs;
    tabsCopy.splice(index,1);
    setTabs(tabsCopy);
    setNextActiveTab();
  };
  const closeOthers = () => {};
  const closeLeft = () => {};
  const closeRight = () => {};
  const refreshTab = () => {};
  const setNextActiveTab = () => {

  }

  useEffect(() => {
    console.log(currentRouteMeta);
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
