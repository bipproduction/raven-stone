import client from "@/lib/prisma_db"
import _ from "lodash"

export default async function top5WinningRate(req: any, res: any) {

    const data: any[] = (await client.nationWideRatingV2.findUnique({where: {id: 1}}))?.data as []
    const candidate = await client.candidate.findMany()

    const data2 = data.map((v) => ({
        ..._.omit(v, [
            'candidate_1_id',
            'candidate_2_id',
            'text',
            'trust',
            'joy',
            'surprise',
            'anticipation',
            'sadness',
            'fear',
            'anger',
            'disgust',
            'candidate_1_name',
            'candidate_2_name'
        ]),
        persen: Number(v.rate??"0")??0,
        candidate1: _.find(candidate, { id: v.candidate_1_id }),
        candidate2: _.find(candidate, { id: v.candidate_2_id }),

    }))

    const data3 = _.take(_.orderBy(data2, ['persen'], ['desc']), 5)

    // console.log(data3)
    res.status(200).json(data3)

    // const candidate1 = await client.candidate.findMany()
    // const candidate2 = await client.candidate.findMany()

    // const listHasil = []
    // for (let item1 of candidate1) {
    //     for (let item2 of candidate2) {
    //         if (item1.id != item2.id) {
    //             const body = {
    //                 candidate1: item1,
    //                 candidate2: item2,
    //                 count: await client.emotionViewProvinceCoupleV2.aggregate({
    //                     where: {
    //                         candidate1Id: item1.id,
    //                         candidate2Id: item2.id
    //                     },
    //                     _sum: {
    //                         trust: true,
    //                         joy: true,
    //                         surprise: true,
    //                         anticipation: true,
    //                         sadness: true,
    //                         fear: true,
    //                         anger: true,
    //                         disgust: true,
    //                     },

    //                 })
    //             }

    //             const body2 = {
    //                 ..._.omit(body, ['count']),
    //                 count: _.sum(_.values(body.count._sum))
    //             }

    //             listHasil.push(body2)
    //         }
    //     }
    // }

    // const total = _.max(listHasil.map((v) => v.count))! + 1000
    // const hasilPersen = listHasil.map((v) => ({
    //     ..._.omit(v, ['count']),
    //     persen: _.round((v.count / total!) * 100, 2)
    // }))

    // res.status(200).json(_.take(_.orderBy(hasilPersen, ['persen'], ['desc']), 5))




}