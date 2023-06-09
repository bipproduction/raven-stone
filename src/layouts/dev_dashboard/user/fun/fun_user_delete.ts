import { api } from "@/lib/api";
import toast from "react-simple-toasts";

export async function user_delete({ body }: { body: string }) {
    return await fetch(api.apiDevDashboardUserDelete, {
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