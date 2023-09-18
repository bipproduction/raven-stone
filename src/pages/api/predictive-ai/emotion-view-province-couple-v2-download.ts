import client from "@/lib/prisma_db";
import _ from "lodash";
import Papa from "papaparse";

export default async function handler(req: any, res: any) {
    const { candidate1, candidate2 } = req.query

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
            Province: {
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
        provinceId: v.Province!.id,
        provinceName: v.Province!.name,
        trust: v.trust,
        joy: v.joy,
        surprise: v.surprise,
        anticipation: v.anticipation,
        sadness: v.sadness,
        fear: v.fear,
        anger: v.anger,
        disgust: v.disgust,
    }))
    return res
        .status(200)
        .setHeader("Content-Type", "text/csv")
        .setHeader("Content-Disposition", `attachment; filename=emotion-view-province-couple-v2_${_.kebabCase(candidate[Number(candidate1) - 1].name!)}_${_.kebabCase(candidate[Number(candidate2) - 1].name!)}.csv`)
        .send(Papa.unparse(_.orderBy(result, ["provinceId"])));
}