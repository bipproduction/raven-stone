import { sUser } from "@/s_state/s_user"
import toast from "react-simple-toasts"



// This function writes a user log entry to the server
export const funUserLogWrite = async ({ title, detail }: { title: string, detail: string }) => {

    const userId = sUser.value!.id
    if (!userId || userId === undefined) throw new Error("userId is required")
    return await fetch("/api/user_log_post", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, detail, userId }),
    }).then(res => {
        // If the POST request was successful (status code 201), show a success toast message
        if (res.status == 201) return toast("success")
        // If the POST request was unsuccessful, show an error toast message
        toast("error")
    })
}
