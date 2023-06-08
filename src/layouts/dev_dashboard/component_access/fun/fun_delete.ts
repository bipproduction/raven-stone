import { api } from "@/lib/api";

export async function fun_component_access_delete({ data }: { data: any }) {
    return await fetch(api.apiDevDashboardComponentAccessDelete, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(v => v.json())
}