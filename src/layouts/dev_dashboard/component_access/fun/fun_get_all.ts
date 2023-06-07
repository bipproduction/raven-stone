import { api } from "@/lib/api";

export async function fun_component_access_get_all() {
    return fetch(api.apiDevDashboardComponentAccessGetAll).then((res) => res.json())
}