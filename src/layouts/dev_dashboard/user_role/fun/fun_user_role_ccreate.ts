import { api } from "@/lib/api";
import toast from "react-simple-toasts";

export async function fun_user_role_create({ body }: { body: any }) {
    return await fetch(api.apiDevDashboardUserRoleCreate, {
        method: 'POST',
        body: JSON.stringify(body),
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