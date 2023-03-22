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
            anger: true,
            anticipation: true,
            disgust: true,
            fear: true,
            joy: true,
            sadness: true,
            surprise: true,
            trust: true,
        },
    })

    const hasil = data.map((v) => ({
        ..._.omit(v, ["City", "Province"]),
        provinceId: v.Province?.id,
        provinceName: v.Province?.name,
        value: v.City?.CityValue[0].value,
        anger: Math.round((v.anger! / 100) * v.City?.CityValue![0].value!),
        anticipation: Math.round((v.anticipation! / 100) * v.City?.CityValue![0].value!),
        disgust: Math.round((v.disgust! / 100) * v.City?.CityValue![0].value!),
        fear: Math.round((v.fear! / 100) * v.City?.CityValue![0].value!),
        joy: Math.round((v.joy! / 100) * v.City?.CityValue![0].value!),
        sadness: Math.round((v.sadness! / 100) * v.City?.CityValue![0].value!),
        surprise: Math.round((v.surprise! / 100) * v.City?.CityValue![0].value!),
        trust: Math.round((v.trust! / 100) * v.City?.CityValue![0].value!)
    }))

    const hasil2 = _.map(_.groupBy(hasil, "provinceId"), (o, idx) => ({
        id: o[0].provinceId,
        name: o[0].provinceName,
        value: _.sumBy(o, 'value'),
        emotion: {
            trust: _.sumBy(o, "trust"),
            anger: _.sumBy(o, "anger"),
            anticipation: _.sumBy(o, "anticipation"),
            disgust: _.sumBy(o, "disgust"),
            fear: _.sumBy(o, "fear"),
            joy: _.sumBy(o, "joy"),
            sadness: _.sumBy(o, "sadness"),
            surprise: _.sumBy(o, "surprise"),
        }
    }))

    const hasil3 = hasil2.map((v) => ({
        ..._.omit(v, [
            "trust",
            "anger",
            "anticipation",
            "disgust",
            "fear",
            "joy",
            "sadness",
            "surprise",
        ]),
        total: _.sum(Object.values(v.emotion))
    }))

    const hasil4 = _.orderBy(hasil3, ["trust"], "desc")
    const hasil5 = hasil4.map((v, i) => ({
        no: i + 1,
        ...v,
    }))

    res.status(200).json(hasil5)
}

export default emotionalViewViaProvinceByDateCandidate

