import { gEmotionalViewViaProvince } from './../g_state/predictive_ai/g_emotional_view_via_province';


import { gSelectedDate } from "@/g_state/g_map_state";
import { api } from "@/lib/api";

export const funcLoadEmotionalViwViaProvinceByDate = () => fetch(api.apiPredictiveAiEmotionalViewViaProvinceByDate + `?date=${gSelectedDate.value}`).then(v => v.json()).then(gEmotionalViewViaProvince.set)