import { useEffect, useState } from 'react';
import { useMatches, useOutlet } from 'react-router-dom';

import { useFlattenedRoutes } from './use-flattened-routes';
import { useRouter } from './use-router';

import { RouteMeta } from '#/router';
import PageMapper from '@/utils/page-mapper';

/**
 * 返回当前路由Meta信息
 */
export function useMatchRouteMeta() {
  const [matchRouteMeta, setMatchRouteMeta] = useState<RouteMeta>();

  // 获取路由组件实例
  const children = useOutlet();
  
  
  // 获取所有匹配的路由
  const matchs = useMatches();

  // 获取拍平后的路由菜单
  const flattenedRoutes = useFlattenedRoutes();

  // const pathname = usePathname();
  const { push } = useRouter();

  useEffect(() => {
    // 获取当前匹配的路由
    const lastRoute = matchs.at(-1);
    console.log('children', children);
    console.log('lastRoute', lastRoute);
    console.log('flattenedRoutes', flattenedRoutes);
    const currentRouteMeta = flattenedRoutes.find(
      (item) => item.key === lastRoute?.pathname || `${item.key}/` === lastRoute?.pathname,
      );
      
      console.log('currentRouteMeta', currentRouteMeta);
    if (currentRouteMeta) {
      if (!currentRouteMeta.hideTab) {
        currentRouteMeta.outlet = children;
        setMatchRouteMeta(currentRouteMeta);
      }
    } else {
      // push(PageMapper.Home);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchs]);

  return matchRouteMeta;
}
