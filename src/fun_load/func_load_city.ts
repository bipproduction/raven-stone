
// import { sListCity } from './../g_state/s_list_city';
// import { gListCity } from '../g_state/g_list_city';
import { api } from "@/lib/api";
import { sListCity } from "@/s_state/s_list_city";

export const funcLoadCity = () => fetch(api.apiUtilGetCity).then(v => v.json()).then((val) => {
    sListCity.value = val
    // gListCity.set(val)
    // sListCity.value = val
})