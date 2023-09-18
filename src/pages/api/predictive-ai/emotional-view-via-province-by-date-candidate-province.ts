import client from '@/lib/prisma_db';
import _ from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';
const emotionalViewViaProvinceByDateProvinceCandidate = async (req: NextApiRequest, res: NextApiResponse) => {
    const { date, provinceId, candidateId } = req.query

    if (!date || !provinceId || !candidateId) return res.status(403).end()
    const data = await client.dataByContent.findMany({
        where: {
            date: new Date(date!.toString()),
            candidateId: Number(candidateId),
            provinceId: Number(provinceId)
        },
        select: {

            Province: {
                select: {
                    id: true,
                    name: true
                }
            },
            City: {
                select: {
                    id: true,
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

    const hasil = data.map((v) => ({
        ..._.omit(v, ["City", "Province",
            "trust",
            "joy",
            "surprise",
            "anticipation",
            "sadness",
            "fear",
            "anger",
            "disgust",
        ]),
        cityId: v.City?.id,
        city: v.City?.name,
        provinceId: v.Province?.id,
        provinceName: v.Province?.name,
        value: v.City?.CityValue[0].value,
        emotion: {
            trust: v.trust,
            joy: v.joy,
            surprise: v.surprise,
            anticipation: v.anticipation,
            sadness: v.sadness,
            fear: v.fear,
            anger: v.anger,
            disgust: v.disgust,
            // trust: Math.round((v.trust! / 100) * v.City?.CityValue![0].value!),
            // joy: Math.round((v.joy! / 100) * v.City?.CityValue![0].value!),
            // surprise: Math.round((v.surprise! / 100) * v.City?.CityValue![0].value!),
            // anticipation: Math.round((v.anticipation! / 100) * v.City?.CityValue![0].value!),
            // sadness: Math.round((v.sadness! / 100) * v.City?.CityValue![0].value!),
            // fear: Math.round((v.fear! / 100) * v.City?.CityValue![0].value!),
            // anger: Math.round((v.anger! / 100) * v.City?.CityValue![0].value!),
            // disgust: Math.round((v.disgust! / 100) * v.City?.CityValue![0].value!)
        }
    }))

    res.status(200).json(hasil.map((v: any) => ({
        ...v,
        total: _.sum(Object.values(v.emotion))
    })))
}

export default emotionalViewViaProvinceByDateProvinceCandidate