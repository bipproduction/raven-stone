import { api } from "@/lib/api";
import moment from "moment";

export async function fun_check_copy_data_count({ val }: { val: any }) {
    const check = await fetch(
        api.apiMapControllCopyDataCheckCount +
        "?date=" +
        moment(val).format("YYYY-MM-DD")
    );
    return await check.json()
}