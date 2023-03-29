import { gCityContextDirection } from './../g_state/g_city_context_direction';
// import { sCityContextDirection } from './../s_state/s_state_city_context_direction';
import { api } from "@/lib/api";

export const funcLoadCityContextDirection = () => fetch(api.apiUtilGetCityContextDirection).then(v => v.json()).then(gCityContextDirection.set)