// import { IndexRouteObject, RouteObject } from "react-router-dom";
import { UserList } from "@/views/user/list";
import { UserDetail } from "@/views/user/detail";
import { Menus } from "@/views/menu";
import { LogList } from "@/views/log/list";
import { RoleList } from "@/views/role/list";
import { Profile } from "@/views/user/profile";

export const routes = {
  path: "system",
  children: [
    {
      index: true,
      path: "users",
      element: <UserList />,
      meta: {
        label: "menu.users",
      },
    },
    {
      index: true,
      path: "user/profile",
      element: <Profile />,
      meta: {
        label: "menu.userProfile",
      },
    },
    {
      path: "user/:id",
      element: <UserDetail />,
      meta: {
        label: "menu.userDetail",
      },
    },
    {
      path: "menus",
      element: <Menus />,
      meta: {
        label: "menu.menus",
      },
    },
    {
      path: "roles",
      element: <RoleList />,
      meta: {
        label: "menu.roles",
      },
    },
    {
      path: "logs",
      element: <LogList />,
      meta: {
        label: "menu.logs",
      },
    },
  ],
};
