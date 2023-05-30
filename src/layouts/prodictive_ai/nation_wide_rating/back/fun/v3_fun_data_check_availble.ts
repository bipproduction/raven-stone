import { api } from "@/lib/api";
import { v3_api_check_data_available } from "../../api/v3_api_check_data_available";

export async function v3_fun_data_chack_availble({ date }: { date: string }) {
    const data = await fetch(api.apiV3NationWideRatingDataCheckAvailable + `?date=${date}`);
    return await data.json();
}