import { lazy } from "react";
import { AppRouteObject } from "#/router";
import { RouterProvider, Navigate,RouteObject, createBrowserRouter } from "react-router-dom";
import DashboardLayout from '@/layout/dashboard';

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
  const asyncRoutes: AppRouteObject = {
    path: '/',
    element: (
      // <AuthGuard>
        <DashboardLayout />
      // </AuthGuard>
    ),
    children: [{ index: true, element: <Navigate to={"/dashboard/workbench"} replace /> }],
  };

  const routes = [LoginRoute,asyncRoutes, PAGE_NOT_FOUND_ROUTE];

  const router = createBrowserRouter(routes as unknown as RouteObject[]);
  return <RouterProvider router={router} />;
}
