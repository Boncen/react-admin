import useUserStore from "@/store/userStore";
import React from "react";
/** PermissionGuard. All permissions in the array must be satisfied */
export function PermissionGuard({ children, required }: { children: React.ReactNode; required: string[] }) {
    const userStore = useUserStore();
    let permit = true;
    required.forEach(x => {
        if (!userStore.userPermissions || !userStore.userPermissions.includes(x)) {
            permit = false;
        }
    })

    return <div>{permit ? children : null}</div>
}
