import { createBrowserRouter } from "react-router-dom";
import { AdminLayout } from "@/layout";
import { getMenuModules } from "./utils";
import { Page500 } from "@/views/error/page500";
import { Page404 } from "@/views/error/page404";
import { Dashboard } from "@/views/home/dashboard";
import Login from "@/views/login";
import { generateRouteMap } from "@/utils/routeMenu";

// 获取modules下路由
const modulesRoutes = getMenuModules();
export const fullRouteTable: MenuItemExt[] = [
  {
    path: "/",
    name: "home",
    element: <AdminLayout />,
    errorElement: <Page500 />,
    children: [
      {
        index: true,
        name: "dashboard",
        fullPath: '/',
        element: <Dashboard />,
        meta: {
          label: 'menu.home',
          closable: false,
        }
      },

      {
        path: "*",
        name: "page404",
        element: <Page404 />,
        meta: {
          label: 'menu.page404'
        }
      },
      ...modulesRoutes,
    ],
  },
  {
    path: "login",
    name: "login",
    fullPath: '/login',
    element: <Login />,
  },
];


export const routeMaps = generateRouteMap(fullRouteTable, "");
console.log(222, routeMaps)
export const router = createBrowserRouter(fullRouteTable);
