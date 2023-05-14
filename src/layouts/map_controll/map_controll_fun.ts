import { api } from "@/lib/api";
import { sSelectedDate } from "@/s_state/s_selectedDate";
import { useHydrateAtoms } from "jotai/utils";
import { mc_list_candidate_count } from "./map_controll_state";
import { atom, useAtom } from "jotai";

export function _fun_mc_load_data(set: any) {
    // useHydrateAtoms([[mc_list_candidate_count, data_server]])
    // const [listCandidateCount, setLsistCandidateDataCount] = useAtom(mc_list_candidate_count)
    fetch(
        api.apiDevMapControllCandidateCountContent +
        "?date=" +
        sSelectedDate.value
    )
        .then((res) => res.json())
        .then(set);
}
