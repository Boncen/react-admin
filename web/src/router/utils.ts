// import { AppRouteObject, RouteMeta } from '#/router';
import { AppRouteObject } from '#/router';
/**
 * 基于 src/router/routes/modules 文件结构动态生成路由
 */
export function getMenuModules() {
    const menuModules: AppRouteObject[] = [];
  
    const modules = import.meta.glob('./routes/modules/**/*.tsx', { eager: true });
    console.log('modules', modules);
    
    Object.keys(modules).forEach((key) => {
      const mod = (modules as any)[key].default || {};
      const modList = Array.isArray(mod) ? [...mod] : [mod];
      menuModules.push(...modList);
    });
    return menuModules;
  }