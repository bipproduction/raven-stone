import { api } from "@/lib/api";
import { val_hook_list_componet_role } from "../val/val_hook_list_component_role";

/**
 * ```md
 * mendapatkan data component access secara global
 * dipasang pada _App
 * untuk mendapatkan data awal saaat aplikasi di load
 * val_hook_list_componet_role = digunakan sebagai penampungan 
 * ```
 */
export async function fun_global_component_access_role_get({ setLisComponentAccess }: { setLisComponentAccess: any }) {
    const data = await fetch(api.apiGlobalComponentAccessUserRoleGet).then((v) => v.json())
    setLisComponentAccess(data)
    val_hook_list_componet_role.set(data)
    return data
}