import { sUser } from "@/s_state/s_user"
import { val_hook_list_componet_role } from "../val/val_hook_list_component_role"
import _ from "lodash"

export function func_global_handle_component_role({ name, listComponent }: { name: string, listComponent: any[] }) {
    // const listComponent = val_hook_list_componet_role.get()
    const userRoleId = sUser.value?.userRoleId
    const data = listComponent.find((v) => _.lowerCase(v.name) === _.lowerCase(name))
    const ada = data?.listUserRole.includes(userRoleId)

    if (ada) return true
    return false


    // if (!data || !data.listUserRole) return false
    // const ada = data.listUserRole.includes(userRoleId)
    // if (ada) return true
    // return false


    // const data = listComponent.find((v) => v.name == name)
    // if (!data || !data.listUserRole) return true
    // const ada = data.listUserRole.includes(userRoleId)
    // if (ada) return true
    // return false
}