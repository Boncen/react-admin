import { getMenuModules } from '../utils';
// import { Navigate } from 'react-router-dom';
import { AppRouteObject } from '#/router';
import DashboardLayout from '@/layout/dashboard';
// import PageMapper from '@/utils/page-mapper';

const menuModuleRoutes = getMenuModules();

/**
 * dynamic routes
 * <Navigate to={PageMapper.TestPage} replace />
 */
export const MenuRoutes: AppRouteObject = {
    path: '/',
    element: (
        <DashboardLayout />
    ),
    children: [{ index: true, element: <div>home</div> }, ...menuModuleRoutes],
  };
  