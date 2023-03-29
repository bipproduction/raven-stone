import { sListNotification } from './../s_state/s_list_notification';
import { api } from "@/lib/api";

export const funcLoadNotification = () => fetch(api.apiUtilNotifficationGet).then(v => v.json()).then(v => (sListNotification.value = v)) 