// import { gProvince } from '../g_state/g_province';
import { api } from "@/lib/api"
import { sProvince } from "@/s_state/s_province"

export const funcLoadProvince = () => fetch(api.apiUtilGetProvince).then(v => v.json()).then( v => (sProvince.value = v))