import { api } from "@/lib/api";


/**
 * ## Template
 * ```js
 * const [listuserRole, setListUserRole] = useAtom(
    val_component_access_list_user_role
  );
  ```
 */
export async function fun_component_access_user_role_get({ setListUserRole }: { setListUserRole: any }) {
    setListUserRole(await fetch(api.apiDevDashboardUserRoleGet).then(v => v.json()))
}