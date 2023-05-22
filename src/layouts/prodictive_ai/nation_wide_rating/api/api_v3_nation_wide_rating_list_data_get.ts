import client from "@/lib/prisma_db";

export async function api_v3_nation_wide_rating_list_data_get(req: any, res: any) {
    const { candidate1Id, candidate2Id, date } = req.query
    if (!candidate1Id || !candidate2Id) {
        return res.status(400).json({ message: "Bad Request" })
    }
    const data = await client.v3NationWideRating.findMany({
        where: {
            candidate1Id: +candidate1Id,
            candidate2Id: +candidate2Id,
            date: new Date(date)
        }
    })

    console.log(data)
    return res.status(200).json(data)
}