import { gListEmotion } from './../g_state/g_list_emotion';
import { api } from "@/lib/api"


const funcLoadEmotion = async () => fetch(api.apiUtilGetEmotion).then(v => v.json()).then(gListEmotion.set)

export default funcLoadEmotion