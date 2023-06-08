import { api } from "@/lib/api";

export async function user_get_all() {
    return await fetch(api.apiDevDashboardUserGetAll).then((res) => res.json())
}