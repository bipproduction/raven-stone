import { api } from "@/lib/api";

/**
 * ```js
 * data = {name: string}
 * ```
 */
export async function fun_componen_access_upsert({ data }: { data: any }) {
    return await fetch(api.apiDevDashboardComponentAccessUpsert, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(async (res) => {
        if (res.status == 201) {
            return await res.json()
        }
    })
}