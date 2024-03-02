import { Setting } from "#/setting";
import { StorageEnum } from "#/enum";
import { getItem, setItem } from "@/utils/storage";
import { create } from "zustand";

type settingsStore = {
  settings: Setting;
  toggleDarkMode: (isDark: boolean) => void;
};

const useSettingsStore = create<settingsStore>((set) => ({
  settings: getItem<Setting>(StorageEnum.Settings) || ({} as Setting),
  toggleDarkMode: (isDark: boolean) => {
    set((state) => ({
      settings: { ...state, isDarkMode: isDark },
    }));
    setItem(StorageEnum.Settings, { isDarkMode: isDark })
  },
}));

export const useDarkMode = () =>
  useSettingsStore((state) => state.settings.isDarkMode);
export const useToggleDarkMode = () =>
  useSettingsStore((state) => state.toggleDarkMode);
