import { api } from "@/lib/api"
import _ from "lodash"
import toast from "react-simple-toasts"
import { api_user_update } from "../api/api_user_update"

const url = "/api/"+ "api_user_update"
export async function user_update({ body }: { body: any }) {
    return await fetch(url, {
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