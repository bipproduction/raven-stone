import { gProvince } from '../g_state/g_province';
import { api } from "@/lib/api"

export const funcLoadProvince = () => fetch(api.apiUtilGetProvince).then(v => v.json()).then(gProvince.set)