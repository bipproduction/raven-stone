import client from "@/lib/prisma_db"

export async function v3_api_check_data_candidate(req: any, res: any) {
    const { date } = req.query
    const candidate = await client.candidate.findMany()
    const data = await client.v3NationWideRating.findMany({
        where: {
            date: new Date(date)
        },
        select: {
            id: true,
            candidate1Id: true,
            candidate2Id: true,
            trust: true,
            joy: true,
            surprise: true,
            anticipation: true,
            sadness: true,
            fear: true,
            anger: true,
            disgust: true,
            date: true,
            rate: true,
            text: true
        }
    })
    return res.status(200).json(data)
}