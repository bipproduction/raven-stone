import { api } from "@/lib/api";

export async function fun_v3_nation_wide_rating_load_list_data({ setListData }: { setListData: any }) {
    fetch(api.apiPredictiveAiV3NationWideRatingListDataGet).then(v => v.json()).then(setListData)
}