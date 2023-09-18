import client from "@/lib/prisma_db"
import _ from "lodash"
import 'colors'
import moment from "moment"

export default async function top5WinningRate(req: any, res: any) {

    const data = await client.v3NationWideRating.findMany({
        where: {
            date: new Date(moment().format("YYYY-MM-DD"))
        }
    })

    // console.log(JSON.stringify(data))
    const candidate = await client.candidate.findMany()

    const data2 = data.map((v:any) => ({
        ..._.omit(v, [
            'candidate1Id',
            'candidate2Id',
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
            'candidate_2_name',
            'rate'
        ]),
        persen: Number(v.rate??"0")??0,
        candidate1: candidate.find((c) => Number(c.id) == Number(v.candidate1Id)),
        candidate2: candidate.find((c) => Number(c.id) == Number(v.candidate2Id)),

    }))

    const data3 = _.take(_.orderBy(data2, ['persen'], ['desc']), 5)

    // console.log("ini  data winning rate".yellow)

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