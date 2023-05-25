import { api_emotional_province_kabupaten_get } from "@/layouts/prodictive_ai/emotion_view_province/api/api_emotional_province_kabupaten_get";

export default function handler(req: any, res: any){
    return api_emotional_province_kabupaten_get(req, res)
}