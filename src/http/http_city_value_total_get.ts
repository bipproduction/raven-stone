import { api } from "@/lib/api"
import { sCityValueTotal } from "@/s_state/s_city_value_total";


const get = () => fetch(api.apiDevDevCityValueTotalGet);
const load = () => get().then(v => v.json()).then(v => (sCityValueTotal.value = v))


export const httpCityValueTotal = { get, load }