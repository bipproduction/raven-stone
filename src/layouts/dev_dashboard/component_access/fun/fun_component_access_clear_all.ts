import toast from "react-simple-toasts"

export async function fun_component_access_clear_all() {
    return await fetch("/api/" + "api_component_access_clear_all", {
        method: 'POST',
    }).then(v => {
        if (v.status == 201) {
            toast("success")
            return v
        }
    })
}