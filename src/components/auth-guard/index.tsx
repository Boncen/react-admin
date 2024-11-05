import { UseRouter } from "@/hooks/useRouter";
import useUserStore from "@/store/userStore";
import { Toast } from "@douyinfe/semi-ui";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export function AuthGuard({ children }: any) {
  const { userToken } = useUserStore();
  const { push } = UseRouter();
  const {t} = useTranslation();
  useEffect(function(){
    if (!userToken) {
        Toast.error(t('tip.pleaseLogin'));
        push("login");
        return ;
      }
  }, [])
  return children;
}
