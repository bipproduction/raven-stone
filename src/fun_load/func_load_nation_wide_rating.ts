import { gNationWideRating } from "@/g_state/nation_wide_rating/g_nation_wide_rating";
import { gSelectedCandidate1 } from "@/g_state/nation_wide_rating/g_selected_candidate1";
import { gSelectedCandidate2 } from "@/g_state/nation_wide_rating/g_selected_candidate2";
import { api } from "@/lib/api";

export const funcLoadNationWideRating = () => 
fetch(api.apiPredictiveAiNationWideRating + `?target1=${gSelectedCandidate1.value}&target2=${gSelectedCandidate2.value}`)
.then(v => v.json())
.then(gNationWideRating.set)