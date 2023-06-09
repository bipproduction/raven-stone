import { api } from "@/lib/api";

/**
 * ## Template
 * ```js
 const [listData, setListComponentAccess] = useAtom(val_component_access_lsist);
 *```
 ## implement
 ```js
 fun_component_access_get_all({setListComponentAccess}
 ```
 */
export async function fun_component_access_get_all({ setListComponentAccess }: { setListComponentAccess: any }) {
    const data = fetch(api.apiDevDashboardComponentAccessGetAll).then((res) => res.json())
    setListComponentAccess(data)
    return data
}