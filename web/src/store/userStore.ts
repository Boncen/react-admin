import { Permission, UserInfo, UserToken } from '#/entity'
import { PermissionType, StorageEnum } from '#/enum';
import { getItem, removeItem, setItem } from '@/utils/storage'
import { create } from 'zustand'


// type userStore = {
//     userinfo: any,
//     userToken: any,
//     actions: any
// }

const useUserStore = create((set) => ({
    userinfo: getItem<UserInfo>(StorageEnum.User) || {},
    userToken: getItem<UserToken>(StorageEnum.Token),
    actions: {
        setUserInfo: (userInfo: unknown) => {
          set({ userInfo });
          setItem(StorageEnum.User, userInfo);
        },
        setUserToken: (userToken: unknown) => {
            set({ userToken });
            setItem(StorageEnum.Token, userToken);
        },
        clearUserInfoAndToken() {
          set({ userInfo: {}, userToken: '' });
          removeItem(StorageEnum.User);
          removeItem(StorageEnum.Token);
        },
      },
  }))

  const permissionList: Permission[] = [
    {
      id: '1',
      parentId: '',
      label: '首页',
      name: 'home',
      icon: '',
      type: PermissionType.MENU,
      route: '',
      component: '/dashboard.tsx',
    },
    {
    id: '5733704222120995',
    parentId: '',
    label: 'sample',
    name: 'sample',
    icon: '',
    type: PermissionType.CATALOGUE,
    route: 'sample',
    children: [
      {
        id: '9884486809510480',
        parentId: '5733704222120995',
        label: 's1',
        name: 's1',
        type: PermissionType.MENU,
        route: 's1',
        component: '/sample/s1/index.tsx',
        frameSrc: '',
      },
      {
        id: '9299640886731819',
        parentId: '5733704222120995',
        label: 's2',
        name: 's2',
        type: PermissionType.MENU,
        route: 's2',
        component: '/sample/s2/index.tsx',
        frameSrc: '',
      },
    ],
  },
  {
    id: '5733704222120999',
    parentId: '',
    label: '系统管理',
    name: '系统管理',
    icon: '',
    type: PermissionType.CATALOGUE,
    route: 'sys',
    children: [
      // {
      //   id: '9884486809510482',
      //   parentId: '5733704222120999',
      //   label: '个人信息',
      //   name: '个人信息',
      //   type: PermissionType.MENU,
      //   route: 'my',
      //   component: '/sys/my.tsx',
      //   frameSrc: '',
      // },
    ],
  },
]

  export const useUserInfo = () => useUserStore((state: any) => state.userInfo);
  export const useUserToken = () => useUserStore((state: any) => state.userToken);
  export const useUserPermission = () => useUserStore(() => permissionList); // todo
  export const useUserActions = () => useUserStore((state: any) => state.actions);
  export const useIfUserLogin = () => useUserStore((state: any)=> state.userToken != null && state.userToken !== '' && state.userToken != 'null')
