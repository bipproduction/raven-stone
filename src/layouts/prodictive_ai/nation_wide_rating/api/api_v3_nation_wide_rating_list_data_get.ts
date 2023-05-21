import client from "@/lib/prisma_db";

export default async function api_v3_nation_wide_rating_list_data_get(req: any, res: any) {
    const { candidate1Id, candidate2Id, start, end } = req.query
    if (!candidate1Id || !candidate2Id || !start || !end) {
        return res.status(400).json({ message: "Bad Request" })
    }
    const data = await client.v3NationWideRating.findMany({
        where: {
            candidate1Id,
            candidate2Id,
            date: {
                lte: new Date(end),
                gte: new Date(start)
            }
        }
    })
    return res.status(200).json(data)
}