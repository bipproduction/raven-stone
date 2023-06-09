import { api_user_role_get_all } from "../api/api_user_role_get_all";


/**
 * 
    ## declaration state
    ```js
    const [listUserRole, setListUserRole] = useAtom(val_user_role_list);
    ```
    ## implement
    ```js
    user_role_get_all({ setListUserRole });
    ```
 */
export async function fun_user_role_get_all({setListUserRole}: {setListUserRole: any}) {
    return await fetch("/api/" + api_user_role_get_all.name).then((res) => res.json()).then(setListUserRole)
}