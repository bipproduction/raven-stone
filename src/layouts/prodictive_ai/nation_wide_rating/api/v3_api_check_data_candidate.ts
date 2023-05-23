import client from "@/lib/prisma_db"
import _ from "lodash"
import moment from "moment"

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



    const result = data.map((v) => ({
        ..._.omit(v, ['date']),
        candidate1Name: candidate.find(
            (c) => c.id === v.candidate1Id
        )?.name,
        candidate2Name: candidate.find(
            (c) => c.id === v.candidate2Id
        )?.name,
        date: moment(v.date).format("YYYY-MM-DD")
    }))

    return res.status(200).json(result)
}