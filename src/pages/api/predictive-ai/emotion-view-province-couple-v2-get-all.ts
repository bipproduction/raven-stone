import client from "@/lib/prisma_db"
import _ from "lodash"

export default async function handler(req: any, res: any) {
    const { candidate1, candidate2 } = req.query

    // console.log(__filename.yellow)
    // console.table([candidate1, candidate2])

    const candidate = await client.candidate.findMany()
    const data = await client.emotionViewProvinceCoupleV2.findMany({
        where: {
            candidate1Id: Number(candidate1),
            candidate2Id: Number(candidate2)
        },
        select: {
            id: true,
            candidate1Id: true,
            candidate2Id: true,
            City: {
                select: {
                    id: true,
                    name: true
                }
            },
            trust: true,
            joy: true,
            surprise: true,
            anticipation: true,
            sadness: true,
            fear: true,
            anger: true,
            disgust: true,

        }
    })

    const result = data.map((v) => ({
        id: v.id,
        candidate1Id: v.candidate1Id,
        candidate1Name: candidate[v.candidate1Id! - 1].name,
        candidate2Id: v.candidate2Id,
        candidate2Name: candidate[v.candidate2Id! - 1].name,
        cityId: v.City!.id,
        cityName: v.City!.name,
        trust: v.trust,
        joy: v.joy,
        surprise: v.surprise,
        anticipation: v.anticipation,
        sadness: v.sadness,
        fear: v.fear,
        anger: v.anger,
        disgust: v.disgust,
    }))

    res.status(200).json(_.orderBy(result, ["cityId"]))
}