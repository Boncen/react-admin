import { getMenuModules } from '../utils';
import { AppRouteObject } from '#/router';
import DashboardLayout from '@/layout/dashboard';
import Dashboard from '@/pages/dashboard'
import { Suspense } from 'react';

const menuModuleRoutes = getMenuModules();

/**
 * dynamic routes
 * <Navigate to={PageMapper.TestPage} replace />
 */
export const MenuRoutes: AppRouteObject = {
    path: '/',
    element: (
        <Suspense>
            <DashboardLayout />
        </Suspense>
    ),
    children: [{ index: true, element: <Dashboard/>  }, ...menuModuleRoutes],
  };
  