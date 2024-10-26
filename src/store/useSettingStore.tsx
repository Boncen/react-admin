import { LocalEnum } from "@/types/enum";
import { produce } from "immer";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingStore {
  setting: Setting;
  toggleThemeMode: () => void;
  toggleMultiTab: () => void;
  updateLanguage: (lang: string) => void;
}

const useSettingStore = create<SettingStore>()(
  persist(
    (set) => ({
      setting: {
        isDarkMode: false,
        lang: LocalEnum["zh-CN"],
        isUseMultitab: true,
      },
      toggleThemeMode: () =>
        set(
          produce((state) => {
            state.isDarkMode = !state.isDarkMode;
          })
        ),
      toggleMultiTab: () =>
        set(
          produce((state) => {
            state.isUseMultitab = !state.isUseMultitab;
          })
        ),
        updateLanguage: (lang: string) => {
          // const setting = { ...get().setting, lang: lang };
          set(produce((state)=>{
            console.log(lang, state);
            
            state.lang = lang;
          }));
          // setItem(StorageEnum.Settings, setting);
        },
    }),
    {
      name: "setting",
    }
  )
);

export default useSettingStore;
