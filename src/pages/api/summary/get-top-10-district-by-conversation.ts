import client from '@/lib/prisma_db';
import _ from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';
const top10DistrictByConversation = async (req: NextApiRequest, res: NextApiResponse) => {
    const { date, emotion, candidateId } = req.query

    console.log(emotion)
    const data = await client.dataByContent.findMany({
        orderBy: {
            [_.lowerCase(emotion as string)]: "desc"
        },
        where: {
            date: new Date(date as any),
            candidateId: Number(candidateId)
        },
        select: {
            City: {
                select: {
                    name: true,
                    CityValue: {
                        select: {
                            value: true
                        }
                    }
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
        },
    })

    const hasil = data.map((v, i) => ({
        ..._.omit(v, ['City']),
        city: v.City?.name,
        value: v.City?.CityValue[0].value
    })).map((v: any, ii) => ({
        no: ii + 1,
        city: v.city,
        total: v.value,
        value: v.value,
        trust: Math.round((v.trust / 100) * v.value),
        joy: Math.round((v.joy / 100) * v.value),
        surprise: Math.round((v.surprise / 100) * v.value),
        anticipation: Math.round((v.anticipation / 100) * v.value),
        sadness: Math.round((v.sadness / 100) * v.value),
        fear: Math.round((v.fear / 100) * v.value),
        anger: Math.round((v.anger / 100) * v.value),
        disgust: Math.round((v.disgust / 100) * v.value),
    })).map((v) => ({
        no: v.no,
        city: v.city,
        // value:
        //     v.trust +
        //     v.joy +
        //     v.surprise +
        //     v.anticipation +
        //     v.sadness +
        //     v.fear +
        //     v.anger +
        //     v.disgust,

        ..._.omit(v, ['name', 'no'])
    }))

    res.status(200).json(hasil)
}

export default top10DistrictByConversation