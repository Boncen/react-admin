import { AppRouteObject } from "#/router";
import { lazy } from "react";
import { Navigate, Outlet } from "react-router-dom";

const UserPage = lazy(() => import(`@/pages/sys/user/user`));


const UserRoute: AppRouteObject = {
    order: 2,
    path: 'user',
    element: (
        <Outlet />
    ),
    meta: {
      label: 'sys.menu.user',
      key: '/user',
    },
    children:[
        {
            index: true,
            element: <div>user index element</div>
        },
        {
            path: 'user',
            element: (
                <UserPage />
            ),
        }
    ]
  };
  
export default UserRoute;