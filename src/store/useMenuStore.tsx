import { produce } from "immer";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface menuStore {
  menus: Array<MenuItemExt>;
  updateMenus: (menuList: Array<MenuItemExt>) => void;
}

const useMenuStore = create<menuStore>()(
  persist(
    (set) => ({
      menus: [],
      updateMenus: (menuList: Array<MenuItemExt>) =>
        set(
          produce((state) => {
            state.menus = menuList;
          })
        ),
    }),
    { name: "menus" }
  )
);

export default useMenuStore;
