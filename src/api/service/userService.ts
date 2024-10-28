import { isDevelopmentEnv } from "@/utils";
import client from "../apiClient";

const login = (data: any) => {
  if (isDevelopmentEnv()) {
    return new Promise(function (resolve, reject) {
      if (data.account == "admin" && data.password == "admin") {
        resolve({ code: 0, message: "ok", token: "qwertyuioplkjhgfdsazxcvbnm1234567890000" });
      } else {
        reject({ code: 1, message: "Wrong password or account!" });
      }
    });
  }
  return client.post({ url: "/login", data });
};
const logout = () => client.post({ url: "/logout" });

const getUserInfo = () => client.get({ url: "/userinfo" });
const updateUserInfo = (data: any) => client.put({ url: "/userinfo", data });
const getUserList = (data: any) => client.get({ url: "/users", data });
const getRoleList = (data: any) => client.get({ url: "/roles", data });

export { login, logout, getUserInfo, updateUserInfo, getUserList, getRoleList };
