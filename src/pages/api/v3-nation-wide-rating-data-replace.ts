import { v3_api_data_replace } from "@/layouts/prodictive_ai/nation_wide_rating/api/v3_api_data_replace";

export default function handler(req: any, res: any) {
    return v3_api_data_replace(req, res)
}