import { RouteObject, createBrowserRouter } from "react-router-dom";
import { AdminLayout } from "@/layout";
import { getMenuModules } from "./utils";
import { Page500 } from "@/views/error/page500";
import { Page404 } from "@/views/error/page404";
import { Dashboard } from "@/views/home/dashboard";
import Login from "@/views/login";
import { generateRouteMap } from "@/utils";

// 获取modules下路由
const modulesRoutes = getMenuModules();
export const fullRouteTable: RouteObject[] = [
  {
    path: "/",
    element: <AdminLayout />,
    errorElement: <Page500 />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        meta: {
          label: 'menu.home'
        }
      },

      {
        path: "*",
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
    element: <Login />,
  },
];


export const routeMaps = generateRouteMap(fullRouteTable, "");
export const router = createBrowserRouter(fullRouteTable);
