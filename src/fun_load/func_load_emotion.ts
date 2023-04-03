// import { gListEmotion } from './../g_state/g_list_emotion';
import { api } from "@/lib/api"
import { sListEmotion } from "@/s_state/s_list_emotion"


const funcLoadEmotion = async () => fetch(api.apiUtilGetEmotion).then(v => v.json()).then(v => (sListEmotion.value = v))

export default funcLoadEmotion