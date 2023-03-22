import { gIndonesiaMap } from "@/g_state/g_indonesia_map";
import { api } from "@/lib/api";

export const funcLoadIndonesiaMap = () => fetch(api.apiIndonesiaMap).then((v) => v.json()).then(gIndonesiaMap.set)