import client from "@/lib/prisma_db"

export async function v3_api_check_data_available(req: any, res: any) {
    const { date } = req.query

    if (!date) {
        return res.status(400).json({ message: "Bad Request" })
    }
    
    const data = await client.v3NationWideRating.findMany({
        where: {
            date: new Date(date)
        }
    })

    return res.status(200).json(data)
}