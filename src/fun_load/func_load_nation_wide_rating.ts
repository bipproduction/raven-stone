import { sSelectedDate } from './../s_state/s_selectedDate';
import { sNationWide } from './../s_state/s_nation_wide';
import { sSelectedCandidate1 } from './../s_state/s_selected_candidate1';
// import { gSelectedDate } from '@/g_state/g_map_state';
// import { gNationWideRating } from "@/g_state/nation_wide_rating/g_nation_wide_rating";
// import { gSelectedCandidate1 } from "@/g_state/nation_wide_rating/g_selected_candidate1";
// import { gSelectedCandidate2 } from "@/g_state/nation_wide_rating/g_selected_candidate2";
import { api } from "@/lib/api";
import { sSelectedCandidate2 } from '@/s_state/s_selected_candidate2';

export const funcLoadNationWideRating = () =>
    fetch(api.apiPredictiveAiNationWideRating + `?date=${sSelectedDate.value}&candidate1=${sSelectedCandidate1.value}&candidate2=${sSelectedCandidate2.value}`)
        .then(v => v.json())
        .then(v => (sNationWide.value = v))