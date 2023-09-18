import { api_map_controll_copy_data_check_count } from "@/layouts/map_controll/api/api_map_contoll_copy_data_check_count";

export default async function handler(req: any, res: any) {
    return api_map_controll_copy_data_check_count(req, res)
}