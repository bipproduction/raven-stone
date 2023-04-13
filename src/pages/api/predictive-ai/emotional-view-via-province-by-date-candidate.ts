import client from '@/lib/prisma_db';
import _ from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';
const emotionalViewViaProvinceByDateCandidate = async (req: NextApiRequest, res: NextApiResponse) => {
    const { date, candidateId } = req.query
    const data = await client.dataByContent.findMany({
        where: {
            date: new Date(date!.toString()),
            candidateId: Number(candidateId)
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
        ..._.omit(v, ["City", "Province"]),
        provinceId: v.Province?.id,
        provinceName: v.Province?.name,
        value: v.City?.CityValue[0].value,
        trust: (v.trust! / 100) * v.City?.CityValue![0].value!,
        joy: (v.joy! / 100) * v.City?.CityValue![0].value!,
        surprise: (v.surprise! / 100) * v.City?.CityValue![0].value!,
        anticipation: (v.anticipation! / 100) * v.City?.CityValue![0].value!,
        sadness: (v.sadness! / 100) * v.City?.CityValue![0].value!,
        fear: (v.fear! / 100) * v.City?.CityValue![0].value!,
        anger: (v.anger! / 100) * v.City?.CityValue![0].value!,
        disgust: (v.disgust! / 100) * v.City?.CityValue![0].value!
    }))

    const hasil2 = _.map(_.groupBy(hasil, "provinceId"), (o, idx) => ({
        id: o[0].provinceId,
        name: o[0].provinceName,
        value: _.sumBy(o, 'value'),
        total: _.sumBy(o, 'value'),
        emotion: {
            trust: Math.round(_.sumBy(o, "trust")),
            joy: Math.round(_.sumBy(o, "joy")),
            surprise: Math.round(_.sumBy(o, "surprise")),
            anticipation: Math.round(_.sumBy(o, "anticipation")),
            sadness: Math.round(_.sumBy(o, "sadness")),
            fear: Math.round(_.sumBy(o, "fear")),
            anger: Math.round(_.sumBy(o, "anger")),
            disgust: Math.round(_.sumBy(o, "disgust")),
        }
    }))

    const hasil3 = hasil2.map((v) => ({
        ..._.omit(v, [
            "trust",
            "joy",
            "surprise",
            "anticipation",
            "sadness",
            "fear",
            "anger",
            "disgust",
        ]),
        // total: _.sum(Object.values(v.emotion))
    }))

    // const hasil4 = _.orderBy(hasil3, ["trust"], "desc")
    const hasil5 = hasil3.map((v, i) => ({
        no: i + 1,
        ...v,
    }))

    res.status(200).json(hasil5)
}

export default emotionalViewViaProvinceByDateCandidate

