import { api } from "@/lib/api";


/**
 * ## value
 ```js
 const [userRoleList, setUserRoleList] = useAtom(val_user_role_list);
 ```
 ## implement
 ```js
 user_role_get({ setUserRoleList });
 ```
 */
export async function user_role_get({ setUserRoleList }: { setUserRoleList: any }) {
    const data = await fetch(api.apiDevDashboardUserRoleGet).then((res) => res.json())
    setUserRoleList(data)
    return data
}   