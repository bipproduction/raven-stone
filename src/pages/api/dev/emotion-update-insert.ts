import client from "@/lib/prisma_db";
import _ from "lodash";
import { NextApiRequest, NextApiResponse } from "next";

export default async function updateInsertContent(req: NextApiRequest, res: NextApiResponse) {
    const body: {
        type: string,
        data: any[],
        date: string,
        candidateId: number
    } = req.body
    if (!body.type || !body.data) return res.status(400).end()

    if (body.type == "update") {
        const data = body.data.map((v) => ({
            ..._.omit(v, ['city_name']),
            id: Number(v.id),
            candidateId: Number(v.candidateId),
            provinceId: Number(v.provinceId),
            cityId: Number(v.cityId),
            anger: Number(v.anger),
            disgust: Number(v.disgust),
            fear: Number(v.fear),
            joy: Number(v.joy),
            sadness: Number(v.sadness),
            surprise: Number(v.surprise),
            trust: Number(v.trust),
            anticipation: Number(v.anticipation),

        }))
        for (let itm of data) {
            await client.dataByContent.update({
                where: {
                    id: Number(itm.id)
                },
                data: itm
            })
        }

        res.status(201).end()
    }

    if (body.type == "insert") {
        if (!body.date && !body.candidateId && !body.data && !body.type) return res.status(400).end()

        const data = body.data.map((v) => ({
            ..._.omit(v, ['city_name', 'date', 'candidateId']),
            date: new Date(body.date),
            candidateId: Number(body.candidateId),
            provinceId: Number(v.provinceId),
            cityId: Number(v.cityId),
            anger: Number(v.anger),
            disgust: Number(v.disgust),
            fear: Number(v.fear),
            joy: Number(v.joy),
            sadness: Number(v.sadness),
            surprise: Number(v.surprise),
            trust: Number(v.trust),
            anticipation: Number(v.anticipation),
        }))
        await client.dataByContent.createMany({ data })

        res.status(201).end()
    }

    return res.status(400).end()

}