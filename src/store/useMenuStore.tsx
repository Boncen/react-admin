import { produce } from "immer";
import { create } from "zustand";

interface menuStore {
  menus: MenuItem[];
  updateMenus: (menuList: MenuItem[]) => void;
}

const useMenuStore = create<menuStore>()((set) => ({
  menus: [],
  updateMenus: (menuList: MenuItem[]) =>
    set(
      produce((state) => {
        state.menus = menuList;
      })
    ),
}));

export default useMenuStore;
