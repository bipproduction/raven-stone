import client from "@/lib/prisma_db";
import _, { sumBy } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";
import 'colors'

const nationWideRating = async (req: NextApiRequest, res: NextApiResponse) => {
    const { date, candidate1, candidate2 } = req.query

    console.log(date, candidate1, candidate2)

    let k1 = await client.dataByContent.aggregate({
        where: {
            date: new Date(date as string),
            candidateId: Number(candidate1)
        },
        _sum: {
            trust: true,
            joy: true,
            surprise: true,
            anticipation: true,
            sadness: true,
            fear: true,
            anger: true,
            disgust: true
        }
    })

    let k2 = await client.dataByContent.aggregate({
        where: {
            date: new Date(date as string),
            candidateId: Number(candidate2)
        },
        _sum: {
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

    const kandidatA: any = k1._sum
    const kandidatB: any = k2._sum

    const candidateValue1 = await client.candidateValue.findUnique({
        where: {
            id: Number(candidate1)
        },
        select: {
            value1: true,
            value2: true
        }
    })

    const candidateValue2 = await client.candidateValue.findUnique({
        where: {
            id: Number(candidate2)
        },
        select: {
            value1: true,
            value2: true
        }
    })


    const positive = ['trust', 'joy', 'surprise', 'anticipation']
    const kandidatC: any = {}

    for (let item of _.keys(kandidatA)) {
        if (!positive.includes(item)) {
            kandidatA[item] += candidateValue1?.value1
            // kandidatB[item] += candidateValue2?.value1
        } else {
            kandidatA[item] += candidateValue2?.value2
            // kandidatB[item] += candidateValue1?.value2
        }

        kandidatC[item] = kandidatA[item] + kandidatB[item]

    }

    const gabungan = _.sum([_.sum(_.values(kandidatA)), _.sum(_.values(kandidatB))])

    const prosentase = _.mapValues(kandidatC, (value) => _.round((value / gabungan) * 100, 2))

    console.log("gabungan".green, gabungan)

    // const hasil = calculateNewEmotionPercentage({
    //     candidate1: kandidatA,
    //     candidate2: kandidatB,
    //     score1: candidateValue1,
    //     score2: candidateValue12
    // })


    res.status(200).json(prosentase)
}



// {
//     trust: 57,
//     joy: 44,
//     surprise: 34,
//     anticipation: 27,
//     sadness: 20,
//     fear: 16,
//     anger: 12,
//     disgust: 31,
//     candidate1: 1,
//     candidate2: 5
//   }

export default nationWideRating