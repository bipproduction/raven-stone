import { api } from "@/lib/api";

export async function user_role_get() {
    return await fetch(api.apiDevDashboardUserRoleGet).then((res) => res.json())
}   