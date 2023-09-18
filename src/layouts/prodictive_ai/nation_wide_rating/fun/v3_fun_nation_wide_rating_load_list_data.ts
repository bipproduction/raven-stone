import { api } from "@/lib/api";
import moment from "moment";

export async function v3_fun_nation_wide_rating_load_list_data({ setListData, candidate1Id, candidate2Id }: { setListData: any, candidate1Id: number, candidate2Id: number }) {
    fetch(api.apiPredictiveAiV3NationWideRatingListDataGet + `?candidate1Id=${candidate1Id}&candidate2Id=${candidate2Id}&date=${moment().format("YYYY-MM-DD")}`).then(v => v.json()).then(setListData)
}