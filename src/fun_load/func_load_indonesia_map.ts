import { sIndonesiaMap } from './../s_state/s_indonesia_map';
// import { gIndonesiaMap } from "@/g_state/g_indonesia_map";
import { api } from "@/lib/api";

export const funcLoadIndonesiaMap = () => fetch(api.apiIndonesiaMap).then((v) => v.json()).then(v => (sIndonesiaMap.value = v))