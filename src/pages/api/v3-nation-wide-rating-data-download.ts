import { v3_api_data_download } from "@/layouts/prodictive_ai/nation_wide_rating/api/v3_api_data_download";

export default function handler(req: any, res: any) {
    return v3_api_data_download(req, res)
}