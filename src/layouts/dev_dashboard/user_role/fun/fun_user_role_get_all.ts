
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
export async function fun_user_role_get_all({ setListUserRole }: { setListUserRole: any }) {
    const api_url = "/api/api_user_role_get_all"
    return await fetch(api_url).then((res) => res.json()).then(setListUserRole)
}