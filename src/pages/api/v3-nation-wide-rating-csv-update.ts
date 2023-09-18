import { v3_api_csv_update } from "@/layouts/prodictive_ai/nation_wide_rating/api/v3_api_csv_update";

export default function handler(req: any, res: any) {
    return v3_api_csv_update(req, res)
}