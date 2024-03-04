import { Setting } from "#/setting";
import { StorageEnum } from "#/enum";
import { getItem, setItem } from "@/utils/storage";
import { create } from "zustand";

type settingsStore = {
  settings: Setting;
  updateSettings: (setting: Setting) => void;
  toggleDarkMode: (isDarkMode: boolean) => void;
  updateLanguage: (lang: string) => void;
  toggleMultiTab: (val: boolean) => void;
};

export const useSettingsStore = create<settingsStore>((set, get) => ({
  settings: getItem<Setting>(StorageEnum.Settings) || ({} as Setting),
  updateSettings: (setting: Setting) => {
    set(() => ({
      settings: setting,
    }));
    setItem(StorageEnum.Settings, setting);
  },
  toggleDarkMode : (isDarkMode: boolean) => {
    const setting = { ...get().settings, isDarkMode: isDarkMode};
    set(() => ({
      settings: setting,
    }));
    setItem(StorageEnum.Settings, setting);
  },
  updateLanguage: (lang: string) => {
    const setting = { ...get().settings, lang: lang};
    set(() => ({
      settings: setting,
    }));
    setItem(StorageEnum.Settings, setting);
  },
  toggleMultiTab : (val: boolean) => {
    const setting = { ...get().settings, isUseMultitab: val};
    set(() => ({
      settings: setting,
    }));
    setItem(StorageEnum.Settings, setting);
  },
}));

export const useDarkMode = () =>
  useSettingsStore((state) => state.settings.isDarkMode);
export const useToggleDarkMode = () =>
  useSettingsStore((state) => state.toggleDarkMode);
export const useLanguage = () =>
  useSettingsStore((state) => state.settings.lang);
export const useUpdateLang = () => useSettingsStore((state)=> state.updateLanguage);

export const useToggleMultiTab = () =>
  useSettingsStore((state) => state.toggleMultiTab);
