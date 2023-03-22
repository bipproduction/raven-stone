import { gListNationWideChahrt } from "@/g_state/g_nation_wide_chart";
import { api } from "@/lib/api";

export const funcLoadNationWideChart = () => fetch(api.apiSummaryGetNationWideChart)
    .then((v) => v.json())
    .then(gListNationWideChahrt.set);