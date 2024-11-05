import "./App.less";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import "@/locales";
import { Suspense } from "react";
import { LocalEnum } from "./types/enum";
import en_US from "@douyinfe/semi-ui/lib/es/locale/source/en_US";
import zh_CN from "@douyinfe/semi-ui/lib/es/locale/source/zh_CN";
import useSettingStore from "./store/useSettingStore";
import { LocaleProvider } from "@douyinfe/semi-ui";
import { CircleLoading } from "./components/loading/circleSpin";

const App = () => {
  const settingStore = useSettingStore((state) => state.setting);
  return (
      <LocaleProvider
        locale={settingStore.lang === LocalEnum["zh-CN"] ? zh_CN : en_US}
      >
        <Suspense fallback={<CircleLoading />}>
          <RouterProvider router={router} />
        </Suspense>
      </LocaleProvider>
  );
};

export default App;
