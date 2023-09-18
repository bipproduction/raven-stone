// import { sCityContextDirection } from '@/s_state/s_state_city_context_direction';
// import { gCityContextDirection } from './../g_state/g_city_context_direction';
// import { sCityContextDirection } from './../s_state/s_state_city_context_direction';
import { api } from "@/lib/api";
import { sCityContextDirection } from "@/s_state/s_city_ontext_irection";

export const funcLoadCityContextDirection = () => fetch(api.apiUtilGetCityContextDirection).then(v => v.json()).then(v => {
    sCityContextDirection.value = v
})