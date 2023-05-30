import { api } from "@/lib/api";

export function v3_fun_check_data_candidate({ date, setData }: { date: string, setData: any }) {
    fetch(api.apiV3NationWideRatingCheckDataCandidate + `?date=${date}`).then(v => v.json()).then(setData)
}