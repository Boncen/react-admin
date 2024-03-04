import { getMenuModules } from "../utils";
import { AppRouteObject } from "#/router";
import DashboardLayout from "@/layout/dashboard";
import Dashboard from "@/pages/dashboard";
import { Suspense } from "react";
import AuthGuard from "@/components/guard/authGuard";

const menuModuleRoutes = getMenuModules();

/**
 * dynamic routes
 * <Navigate to={PageMapper.TestPage} replace />
 */
export const MenuRoutes: AppRouteObject = {
  path: "/",
  element: (
    <Suspense>
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
    </Suspense>
  ),
  children: [{ index: true, element: <Dashboard /> }, ...menuModuleRoutes],
};
