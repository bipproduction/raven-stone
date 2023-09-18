import { api } from "@/lib/api";
import moment from "moment";

export async function fun_load_emotion_province({
    date = moment().format("YYYY-MM-DD"),
    candidateId = 1,
    setListEmotion
}: {
    date?: string,
    candidateId: number,
    setListEmotion: any,
}) {
    const data = await fetch(api.apiEmotionalProvinceCompleteGet + `?date=${date}&candidateId=${candidateId}`).then(v => v.json());
    setListEmotion(data);
    return data
}