import { atom, useAtom } from "jotai";

export const val_list_user_log = atom<any[]>([]);

// function useListUserLog() {
//     const [listUserLog, setListUserLog] = useAtom(val_list_user_log);
//     return { listUserLog, setListUserLog };
// }


export const valListUserLog = {
    val_list_user_log
}