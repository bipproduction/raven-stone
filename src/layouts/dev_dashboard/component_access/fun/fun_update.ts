import { api } from "@/lib/api"
import toast from "react-simple-toasts"

export async function fun_component_access_update({ data }: { data: any }) {
    return await fetch(api.apiDevDashboardComponentAccessUpdate, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(async (res) => {
        if (res.status == 201) {
            toast("success")
            return await res.json()
        }
    })
}