import { lazy } from "react";
import { AppRouteObject } from "#/router";
import { RouterProvider, Navigate,RouteObject, createBrowserRouter } from "react-router-dom";
import { MenuRoutes } from "./routes/menu-routes";

const LoginRoute: AppRouteObject = {
  path: "/login",
  Component: lazy(() => import("@/pages/sys/login/login")),
};
const PAGE_NOT_FOUND_ROUTE: AppRouteObject = {
  path: "*",
  element: <Navigate to="/404" replace />,
};

export default function Router() {
  //const permissionRoutes = usePermissionRoutes();
  // const asyncRoutes: AppRouteObject = {
  //   path: '/',
  //   element: (
  //       <DashboardLayout />
  //   ),
  //   children: [{ index: true, element: <Navigate to={"/dashboard/workbench"} replace /> }],
  // };
  const routes = [LoginRoute,MenuRoutes, PAGE_NOT_FOUND_ROUTE];

  const router = createBrowserRouter(routes as unknown as RouteObject[]);
  console.log(router);
  
  return <RouterProvider router={router} />;
}
