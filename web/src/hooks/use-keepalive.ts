import { RouteMeta } from "#/router";
import { useRouter } from "@/router/hook";
import { useEffect, useState } from "react";
import { useMatches, useOutlet } from "react-router-dom";

export type KeepAliveTab = RouteMeta & {
  children: any;
};

export default function useKeepAlive() {
  const { push } = useRouter();
  // tabs
  const [tabs, setTabs] = useState<KeepAliveTab[]>([]);
  const [activeTabRoutePath, setActiveTabRoutePath] = useState<string>();

  // 获取路由组件实例
  const children = useOutlet();
  console.log("children", children);

  // 获取所有匹配的路由
  const matchs = useMatches();
  console.log("matchs", matchs);

  useEffect(() => {
    console.log("matchs in useEffects", matchs);
    const lastMatchRoute = matchs[matchs.length - 1];
    // setTabs(...tabs, )
  }, [matchs]);

  return {
    tabs,
    activeTabRoutePath,
  };
}
