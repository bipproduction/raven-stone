import { api } from "@/lib/api";

export async function fun_component_access_user_role_get({ setListUserRole }: { setListUserRole: any }) {
    setListUserRole(await fetch(api.apiDevDashboardUserRoleGet).then(v => v.json()))
}