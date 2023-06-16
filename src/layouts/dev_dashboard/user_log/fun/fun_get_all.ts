
/**
 * 
    ## value
    ```ts
    const [listUserLog, setlistUserLog] = useAtom<any[]>([]);
    ```
    ## implementation
    ```ts
 */
export async function funGetAll() {
    const data = await fetch("/api/user_log_get_all").then(res => res.json())
    return data
}

