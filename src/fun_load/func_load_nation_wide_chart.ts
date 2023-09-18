import { sListNationWideChahrt } from './../s_state/s_list_nation_wide_chart';
// import { gListNationWideChahrt } from "@/g_state/g_nation_wide_chart";
import { api } from "@/lib/api";

export const funcLoadNationWideChart = () => fetch(api.apiSummaryGetNationWideChart)
    .then((v) => v.json())
    .then(v => (sListNationWideChahrt.value = v));