import client from "@/lib/prisma_db";
import _ from "lodash";
import { NextApiRequest, NextApiResponse } from "next";

export default async function summaryTop10ProvinceGet(req: NextApiRequest, res: NextApiResponse) {
    const { date, emotion, candidateId, search } = req.query
   
    const data = await client.dataByContent.findMany({
        where: {
            date: new Date(date as string),
            candidateId: Number(candidateId),
            Province: {
                name: {
                    contains: search as any
                }
            }
        },
        orderBy: {
            [_.lowerCase(emotion as string)]: "desc"
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
        value: v.City?.CityValue[0].value
    }))

    const hasil2 = _.map(_.groupBy(hasil, "provinceId"), (o, idx) => ({
        id: o[0].provinceId,
        name: o[0].provinceName,
        total: _.sumBy(o, 'value'),
        value: _.sumBy(o, 'value'),
        trust: Math.round(_.sumBy(o, "trust")),
        joy: Math.round(_.sumBy(o, "joy")),
        surprise: Math.round(_.sumBy(o, "surprise")),
        anticipation: Math.round(_.sumBy(o, "anticipation")),
        sadness: Math.round(_.sumBy(o, "sadness")),
        fear: Math.round(_.sumBy(o, "fear")),
        anger: Math.round(_.sumBy(o, "anger")),
        disgust: Math.round(_.sumBy(o, "disgust")),
    })).map((v) => ({
        name: v.name,
        // value: v.trust + v.joy + v.surprise + v.anticipation + v.sadness + v.fear + v.anger + v.disgust,
        ..._.omit(v, ['name']),
    }))

    const hasil3 = _.orderBy(hasil2, [_.lowerCase(emotion as string)], "desc")
    const hasil4 = hasil3.map((v, i) => ({
        no: i + 1,
        ...v,
    }))

    res.status(200).json(hasil4)
}