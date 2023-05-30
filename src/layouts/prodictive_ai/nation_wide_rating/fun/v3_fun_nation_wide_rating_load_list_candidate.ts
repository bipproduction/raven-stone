import { api } from "@/lib/api";

export function v3_fun_nation_wide_rating_load_list_candidate({ setListCandidate }: { setListCandidate: any }) {
    fetch(api.apiGetCandidate).then(v => v.json()).then(setListCandidate)
}