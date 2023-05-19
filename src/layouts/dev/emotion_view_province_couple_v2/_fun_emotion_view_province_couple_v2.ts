import { api } from "@/lib/api";

export async function _fun_emotion_view_province_couple({ setListEmotion, selectedCandidate1, selectedCandidate2 }: { setListEmotion: any, selectedCandidate1: number, selectedCandidate2: number }) {
    fetch(api.apiPredictiveAiEmotionViewProvinceCoupleV2GetAll + `?candidate1=${selectedCandidate1}&candidate2=${selectedCandidate2}`).then(v => v.json()).then(setListEmotion);
}

export async function _fun_load_candidate({ setListCandidate }: { setListCandidate: any }) {
    fetch(api.apiGetCandidate).then(v => v.json()).then(setListCandidate);
}