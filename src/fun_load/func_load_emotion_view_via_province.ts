import { sSelectedDate } from './../s_state/s_selectedDate';
import { sSelectedCandidate1 } from './../s_state/s_selected_candidate1';
import { gEmotionalViewViaProvince } from './../g_state/predictive_ai/g_emotional_view_via_province';


// import { gSelectedDate } from "@/g_state/g_map_state";
import { api } from "@/lib/api";
// import { gSelectedCandidate1 } from '@/g_state/nation_wide_rating/g_selected_candidate1';

export const funcLoadEmotionalViwViaProvinceByDate = () => fetch(api.apiPredictiveAiEmotionalViewViaProvinceByDateCandidate + `?date=${sSelectedDate.value}&candidateId=${sSelectedCandidate1.value}`).then(v => v.json()).then(gEmotionalViewViaProvince.set)