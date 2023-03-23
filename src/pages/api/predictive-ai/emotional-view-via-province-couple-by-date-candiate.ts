import client from '@/lib/prisma_db';
import _ from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';
const emotionalViewViaProvinceCoupleByDateCandidate = async (req: NextApiRequest, res: NextApiResponse) => {
    const { date, candidate1, candidate2 } = req.query

    const candidateValue1 = await client.candidateValue.findUnique({
        where: {
            id: Number(candidate1)
        }
    })

    const candidateValue12 = await client.candidateValue.findUnique({
        where: {
            id: Number(candidate2)
        }
    })

    const data1 = await client.dataByContent.groupBy({
        by: ["provinceId"],
        _sum: {
            anger: true,
            anticipation: true,
            disgust: true,
            fear: true,
            joy: true,
            sadness: true,
            surprise: true,
            trust: true,
        },
        where: {
            date: new Date(date as any),
            candidateId: Number(candidate1)
        }
    })

    const data2 = await client.dataByContent.groupBy({
        by: ["provinceId"],
        _sum: {
            anger: true,
            anticipation: true,
            disgust: true,
            fear: true,
            joy: true,
            sadness: true,
            surprise: true,
            trust: true
        },
        where: {
            date: new Date(date as any),
            candidateId: Number(candidate2)
        }
    })

    const data1_a = data1.map((v) => ({
        ..._.omit(v, ["_sum"]),
        emotion: {
            anger: v._sum.anger,
            anticipation: v._sum.anticipation,
            disgust: v._sum.disgust,
            fear: v._sum.fear,
            joy: v._sum.joy,
            sadness: v._sum.sadness,
            surprise: v._sum.surprise,
            trust: v._sum.trust,
        }
    }))

    const data2_a = data2.map((v) => ({
        ..._.omit(v, ["_sum"]),
        emotion: {
            anger: v._sum.anger,
            anticipation: v._sum.anticipation,
            disgust: v._sum.disgust,
            fear: v._sum.fear,
            joy: v._sum.joy,
            sadness: v._sum.sadness,
            surprise: v._sum.surprise,
            trust: v._sum.trust,
        }
    }))


    res.status(200).json({ data1_a })
}

export default emotionalViewViaProvinceCoupleByDateCandidate