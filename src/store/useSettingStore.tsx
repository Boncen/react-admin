import { LocalEnum } from "@/types/enum";
import { produce } from "immer";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingStore {
  setting: Setting;
  toggleThemeMode: (val: boolean) => void;
  toggleMultiTab: (val: boolean) => void;
  updateLanguage: (lang: string) => void;
  setIsUseBreadcrumb: (val: boolean) => void;
}

const useSettingStore = create<SettingStore>()(
  persist(
    (set) => ({
      setting: {
        isDarkMode: false,
        lang: LocalEnum["zh-CN"],
        isUseMultitab: true,
        isUseBreadcrumb: true,
      },
      toggleThemeMode: (val: boolean) =>
        set(
          produce((state) => {
            state.isDarkMode = val;
          })
        ),
      toggleMultiTab: (val: boolean) =>
        set(
          // (state) => ({ setting: { ...state.setting, isUseMultitab: val } })
          produce((state: SettingStore) => {
            state.setting.isUseMultitab = val;
          })
        ),
      setIsUseBreadcrumb: (val: boolean) =>
        set(
          produce((state: SettingStore) => {
            state.setting.isUseBreadcrumb = val;
          })
        ),
      updateLanguage: (lang: string) => {
        set(
          produce((state: SettingStore) => {
            state.setting.lang = lang;
          })
        );
      },
    }),
    { name: "setting" }
  )
);

export default useSettingStore;
