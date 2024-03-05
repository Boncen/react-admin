import { getMenuModules } from "../utils";
import { AppRouteObject } from "#/router";
import DashboardLayout from "@/layout/dashboard";
import Dashboard from "@/pages/dashboard";
import AuthGuard from "@/components/guard/authGuard";
const menuModuleRoutes = getMenuModules();

/**
 * dynamic routes
 * <Navigate to={PageMapper.TestPage} replace />
 */
export const MenuRoutes: AppRouteObject = {
  path: "/",
  element: (
      <AuthGuard>
        <DashboardLayout />
      </AuthGuard>
  ),
  children: [{ index: true, element: <Dashboard /> }, ...menuModuleRoutes],
};
