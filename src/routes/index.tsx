import {
    RouteObject,
    createBrowserRouter,
} from "react-router-dom";
import { AdminLayout } from "@/layout";
import { getMenuModules } from "./utils";
import { Page500 } from "@/views/error/page500";
import { Page404 } from "@/views/error/page404";

// 获取modules下路由
const modulesRoutes = getMenuModules();

const route: RouteObject = {
    path: "/",
    element: <AdminLayout />,
    errorElement: <Page500 />,
    children: [
        {
            index: true,
            element: <div className="text-3xl font-bold underline text-lime-400">Dashboard</div>
        },
        {
            path: '*',
            element: <Page404 />
        },
        ...modulesRoutes
    ]
}
export const router = createBrowserRouter([route]);
