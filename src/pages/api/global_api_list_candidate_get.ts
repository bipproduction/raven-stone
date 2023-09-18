import { global_api_list_candidate_get } from "@/global/api/global_api_list_candidate_get";

export default function handler(req: any, res: any) {
    return global_api_list_candidate_get(req, res)
}