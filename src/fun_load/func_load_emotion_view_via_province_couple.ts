import { sSelectedDate } from './../s_state/s_selectedDate';
import { sSelectedCandidate2 } from './../s_state/s_selected_candidate2';
import { sSelectedCandidate1 } from './../s_state/s_selected_candidate1';
// import { gSelectedCandidate2 } from '@/g_state/nation_wide_rating/g_selected_candidate2';
// import { gSelectedCandidate1 } from '@/g_state/nation_wide_rating/g_selected_candidate1';
// import { gSelectedDate } from '@/g_state/g_map_state';
import { api } from "@/lib/api";
import { sEmotionalViewViaProvinceCouple } from '@/s_state/s_emotional_view_via_province_couple';

export const funcLoadEmotionalViwViaProvinceCouple = (provinceId: string) => fetch(api.apiPredictiveAiEmotionalViewViaProvinceCoupleByDateCandidateProvince + `?date=${sSelectedDate.value}&candidateId1=${sSelectedCandidate1.value}&candidateId2=${sSelectedCandidate2.value}&provinceId=${provinceId}`).then(v => v.json()).then(v => (sEmotionalViewViaProvinceCouple.value = v))