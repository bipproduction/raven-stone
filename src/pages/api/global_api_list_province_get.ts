import { global_api_list_province_get } from "@/global/api/global_api_list_province_get";

export default function handler(req: any, res: any){
    return global_api_list_province_get(req, res)
}