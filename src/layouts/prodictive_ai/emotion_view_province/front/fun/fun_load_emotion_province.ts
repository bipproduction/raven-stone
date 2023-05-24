import { api } from "@/lib/api";
import moment from "moment";

export function fun_load_emotion_province({
    date = moment().format("YYYY-MM-DD"),
    candidateId = 1,
    setListEmotion
}: {
    date?: string,
    candidateId: number,
    setListEmotion: any
}) {
    fetch(api.apiPredictiveAiEmotionalViewViaProvinceByDateCandidate + `?date=${date}&candidateId=${candidateId}`).then(v => v.json()).then(setListEmotion)
}