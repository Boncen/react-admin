import { useIfUserLogin } from "@/store/userStore";
import PageMapper from "@/utils/page-mapper";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function AuthGuard({ children }: { children: ReactNode }) {

  const isLogin = useIfUserLogin();
    console.log('isLogin',isLogin);
    
  return isLogin ? <>{children}</> : <Navigate to={PageMapper.Login} />;
}
