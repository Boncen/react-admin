import { RouteObject } from "react-router-dom";
import { UserList } from "@/views/user/list";
import { UserDetail } from "@/views/user/detail";
import { Menus } from "@/views/menu";

export const routes: RouteObject = {
    path: '/system',
    children: [
        {
            path: 'users',
            element: <UserList />
        },
        {
            path: 'user/:id',
            element: <UserDetail />
        },
        {
            path: 'menus',
            element: <Menus />
        },
    ]
}