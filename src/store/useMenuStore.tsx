import { produce } from "immer";
import { RouteObject } from "react-router-dom";
import { create } from "zustand";
// import { persist } from "zustand/middleware";

// interface menuStore {
//   menus: MenuItem[];
//   updateMenus: (menuList: MenuItem[]) => void;
// }

interface menuStore {
  menus: Array<RouteObject & { meta?: MenuItemMeta }>;
  updateMenus: (menuList: Array<RouteObject & { meta?: MenuItemMeta }>) => void;
}

const useMenuStore = create<menuStore>()((set) => ({
  menus: [],
  updateMenus: (menuList: Array<RouteObject & { meta?: MenuItemMeta }>) =>
    set(
      produce((state) => {
        state.menus = menuList;
      })
    ),
}));

export default useMenuStore;
