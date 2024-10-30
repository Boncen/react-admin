import { produce } from "immer";
import { create } from "zustand";

interface menuStore {
  menus: Array<MenuItemExt>;
  updateMenus: (menuList: Array<MenuItemExt>) => void;
}

const useMenuStore = create<menuStore>()((set) => ({
  menus: [],
  updateMenus: (menuList: Array<MenuItemExt>) =>
    set(
      produce((state) => {
        state.menus = menuList;
      })
    ),
}));

export default useMenuStore;
