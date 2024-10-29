import { produce } from "immer";
import { create } from "zustand";


interface statusStore {
  activeRoute: string | number;
  updateActiveRoute: (active: string) => void;
}

const useStatusStore = create<statusStore>()((set) => ({
  activeRoute: "",
  updateActiveRoute: (active: string) =>
    set(
      produce((state) => {
        state.activeRoute = active;
      })
    ),
}));

export default useStatusStore;
