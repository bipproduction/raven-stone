import { sCityContextDirection } from './../s_state/s_state_city_context_direction';
import { api } from "@/lib/api";

export const funcLoadCityContextDirection = () => fetch(api.apiUtilGetCityContextDirection).then(v => v.json()).then(v => (sCityContextDirection.value = v))