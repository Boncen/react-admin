import { create } from "zustand";
import { persist } from "zustand/middleware";
import { produce } from "immer";

type userStore = {
  userInfo?: UserInfo;
  userToken?: string | null;
  userPermissions?: string[];
  setUserInfo: (userInfo: UserInfo) => void;
  setUserToken: (token: string) => void;
  clearUserInfoAndToken: () => void;
  setUserPermission: (permissions: string[]) => void;
};

const useUserStore = create<userStore>()(
  persist(
    (set) => ({
      userInfo: ({} as UserInfo),
      userToken: '',
      userPermissions: [],
      setUserInfo: (userInfo: UserInfo) => set(
        produce((state: userStore) => {
          state.userInfo = userInfo;
        })
      ),
      setUserToken: (userToken: string) => set(
        produce((state: userStore) => {
          state.userToken = userToken;
        })
      ),
      clearUserInfoAndToken: () => set(
        produce((state: userStore) => {
          state.userInfo = undefined;
          state.userToken = undefined;
          state.userPermissions = [];
        })
      ),
      setUserPermission: (permissions: string[]) => set(
        produce((state: userStore) => {
          state.userPermissions = permissions;
        })
      )
    }),
    { name: "user" }
  )
);

export default useUserStore;