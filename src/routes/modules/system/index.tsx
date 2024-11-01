// import { IndexRouteObject, RouteObject } from "react-router-dom";
import { UserList } from "@/views/user/list";
import { UserDetail } from "@/views/user/detail";
import { Menus } from "@/views/menu";
import { LogList } from "@/views/log/list";
import { RoleList } from "@/views/role/list";
import { Profile } from "@/views/user/profile";

export const routes: MenuItemExt = {
  path: "system",
  name: "system",
  children: [
    {
      index: true,
      name:"userList",
      path: "users",
      element: <UserList />,
      fullPath: '/system/users',
      meta: {
        label: "menu.users",
      },
    },
    {
      name: "userProfile",
      path: "user/profile",
      element: <Profile />,
      fullPath: '/system/user/profile',
      meta: {
        label: "menu.userProfile",
      },
    },
    {
      path: "user/:id",
      name: "userDetail",
      element: <UserDetail />,
      fullPath: '/system/user/:id',
      meta: {
        label: "menu.userDetail",
      },
    },
    {
      path: "menus",
      name: "menuList",
      element: <Menus />,
            fullPath: '/system/menus',

      meta: {
        label: "menu.menus",
      },
    },
    {
      path: "roles",
      name: "roleList",
      element: <RoleList />,
      fullPath: '/system/roles',
      meta: {
        label: "menu.roles",
      },
    },
    {
      path: "logs",
      name: "logList",
      fullPath: '/system/logs',
      element: <LogList />,
      meta: {
        label: "menu.logs",
      },
    },
  ],
};
