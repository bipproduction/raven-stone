import client from '@/lib/prisma_db';
import _ from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';
const top10DistrictByConversation = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = await client.dataByContent.findMany({
        orderBy: {
            trust: "desc"
        },
        where: {
            date: new Date("2023-03-16")
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
            joy: true,
            anger: true,
            anticipation: true,
            disgust: true,
            fear: true,
            sadness: true,
            surprise: true,
            trust: true,
        },
        take: 10
    })

    const hasil = data.map((v) => ({
        ..._.omit(v, ['City']),
        city: v.City?.name,
        value: v.City?.CityValue[0].value
    })).map((v: any) => ({
        city: v.city,
        value: v.value,
        trust: Math.floor((v.trust / 100) * v.value),
        joy: Math.floor((v.joy / 100) * v.value),
        anger: Math.floor((v.anger / 100) * v.value),
        anticipation: Math.floor((v.anticipation / 100) * v.value),
        disgust: Math.floor((v.disgust / 100) * v.value),
        fear: Math.floor((v.fear / 100) * v.value),
        sadness: Math.floor((v.sadness / 100) * v.value),
        surprise: Math.floor((v.surprise / 100) * v.value),
    }))
    res.status(200).json(hasil)
}

export default top10DistrictByConversation