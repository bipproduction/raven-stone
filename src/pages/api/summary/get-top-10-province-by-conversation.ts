import client from '@/lib/prisma_db';
import _ from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';
const getTop10ProvinceByConversation = async (req: NextApiRequest, res: NextApiResponse) => {
    const { date } = req.query
    const data = await client.dataByContent.findMany({
        where: {
            date: new Date(date!.toString()),
            candidateId: 1
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
        anger: Math.floor((v.anger! / 100) * v.City?.CityValue![0].value!),
        anticipation: Math.floor((v.anticipation! / 100) * v.City?.CityValue![0].value!),
        disgust: Math.floor((v.disgust! / 100) * v.City?.CityValue![0].value!),
        fear: Math.floor((v.fear! / 100) * v.City?.CityValue![0].value!),
        joy: Math.floor((v.joy! / 100) * v.City?.CityValue![0].value!),
        sadness: Math.floor((v.sadness! / 100) * v.City?.CityValue![0].value!),
        surprise: Math.floor((v.surprise! / 100) * v.City?.CityValue![0].value!),
        trust: Math.floor((v.trust! / 100) * v.City?.CityValue![0].value!)
    }))

    const hasil2 = _.map(_.groupBy(hasil, "provinceId"), (o, idx) => ({
        id: o[0].provinceId,
        name: o[0].provinceName,
        value: _.sumBy(o, 'value'),
        trust: _.sumBy(o, "trust"),
        anger: _.sumBy(o, "anger"),
        anticipation: _.sumBy(o, "anticipation"),
        disgust: _.sumBy(o, "disgust"),
        fear: _.sumBy(o, "fear"),
        joy: _.sumBy(o, "joy"),
        sadness: _.sumBy(o, "sadness"),
        surprise: _.sumBy(o, "surprise"),

    }))

    const hasil3 = _.orderBy(hasil2, ["trust"], "desc")
    const hasil4 = hasil3.map((v, i) => ({
        no: i + 1,
        ...v,
    }))

    res.status(200).json(hasil4)
}

export default getTop10ProvinceByConversation