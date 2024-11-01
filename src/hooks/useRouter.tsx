import useMenuStore from "@/store/useMenuStore";
import { find } from "@/utils/common";
import { useNavigate } from "react-router-dom";

export function UseRouter() {
  const menuStore = useMenuStore();
  const navigate = useNavigate();

  function push(name: string, params?: Record<string, string | number>) {
    const menu = find(menuStore.menus, (item) => item.name == name);
    if (!menu) {
      navigate('/page_not_found');
      throw new Error(`route name '${name}' not found!`);
    }
    let path: string = menu.fullPath;
    if (!menu.path) {
      const indexChild = menu.children?.find((x: any) => x.index);
      if (!indexChild) {
        throw new Error(`route name '${name}' dont have path!`);
      }
      path = indexChild.fullPath;
    }
    if (params) {
      Object.keys(params).forEach((key) => {
        path = path.replace(":" + key, params[key].toString());
      });
    }
    navigate(path);
  }

  return { push };
}
