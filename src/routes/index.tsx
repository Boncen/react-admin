import { RouteObject, createBrowserRouter } from "react-router-dom";
import { AdminLayout } from "@/layout";
import { getMenuModules } from "./utils";
import { Page500 } from "@/views/error/page500";
import { Page404 } from "@/views/error/page404";
import { Dashboard } from "@/views/home/dashboard";
import Login from "@/views/login";

// 获取modules下路由
const modulesRoutes = getMenuModules();

const routes: RouteObject[] = [
  {
    path: "/",
    element: <AdminLayout />,
    errorElement: <Page500 />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },

      {
        path: "*",
        element: <Page404 />,
      },
      ...modulesRoutes,
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
];

export const router = createBrowserRouter(routes);
