import { api_leader_persona_by_province_id_get } from "@/layouts/prodictive_ai/emotion_view_province/api/api_leader_persona_by_province_id_get";

export default function handler(req: any, res: any){
    return api_leader_persona_by_province_id_get(req, res)
}