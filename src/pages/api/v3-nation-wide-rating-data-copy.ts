import { v3_api_data_copy } from "@/layouts/prodictive_ai/nation_wide_rating/api/v3_api_data_copy";

export default function handler(req: any, res: any) {
    return v3_api_data_copy(req, res)
}