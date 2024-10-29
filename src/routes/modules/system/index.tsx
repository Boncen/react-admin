// import { IndexRouteObject, RouteObject } from "react-router-dom";
import { UserList } from "@/views/user/list";
import { UserDetail } from "@/views/user/detail";
import { Menus } from "@/views/menu";
import { LogList } from "@/views/log/list";
import { RoleList } from "@/views/role/list";

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
