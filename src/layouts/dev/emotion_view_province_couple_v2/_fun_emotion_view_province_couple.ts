import { api } from "@/lib/api";

export async function _fun_emotion_view_province_couple({ setListEmotion }: { setListEmotion: any }) {
    fetch(api.apiPredictiveAiEmotionViewProvinceCoupleV2Get).then(v => v.json()).then(setListEmotion);
}