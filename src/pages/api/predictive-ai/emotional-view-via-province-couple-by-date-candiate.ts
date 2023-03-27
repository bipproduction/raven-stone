import client from '@/lib/prisma_db';
import _ from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';


interface EmotionObject {
    [key: string]: number;
}

interface ScoreObject {
    president?: number;
    vice_president?: number;
}


function calculateNewEmotionPercentage(
    candidate1: EmotionObject,
    score1: ScoreObject,
    candidate2: EmotionObject,
    score2: ScoreObject
): EmotionObject {
    const totalScore = score1.president! + score2.vice_president!;
    const result: EmotionObject = {};
    let totalPercentage = 0;
    for (const emotion in candidate1) {
        const percentage =
            ((candidate1[emotion] * score1.president!) / totalScore +
                (candidate2[emotion] * score2.vice_president!) / totalScore) /
            2;
        // Bulatkan setiap nilai persentase menjadi 2 angka di belakang koma
        result[emotion] = Number(percentage.toFixed(2));
        totalPercentage += result[emotion];
    }
    // Sesuaikan nilai persentase agar jumlah semua emosi menjadi 100%
    if (totalPercentage !== 100) {
        const factor = 100 / totalPercentage;
        for (const emotion in result) {
            result[emotion] *= factor;
            // Bulatkan setiap nilai persentase yang telah disesuaikan menjadi 2 angka di belakang koma
            result[emotion] = Number(result[emotion].toFixed(2));
        }
    }
    return result;
}

const emotionalViewViaProvinceCoupleByDateCandidate = async (req: NextApiRequest, res: NextApiResponse) => {
    const { date, candidate1, candidate2 } = req.query

    if (!date || !candidate1 || !candidate2) return res.status(201).json({date, candidate1, candidate2})

    const candidateValue1 = await client.candidateValue.findUnique({
        where: {
            id: Number(candidate1)
        },
        select: {
            value1: true,
            value2: true
        }
    })

    const candidateValue12 = await client.candidateValue.findUnique({
        where: {
            id: Number(candidate2)
        },
        select: {
            value1: true,
            value2: true
        }
    })

    const score_candidate1: ScoreObject = {}
    const score_candidate2: ScoreObject = {}

    score_candidate1.president = candidateValue1?.value1 as any
    score_candidate1.vice_president = candidateValue1?.value2 as any

    score_candidate2.president = candidateValue12?.value1 as any
    score_candidate2.vice_president = candidateValue12?.value2 as any


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
        },
    }))

    const province = await client.province.findMany()

    const listHasil = []
    for (let i = 0; i < data1_a.length; i++) {
        const emotion = calculateNewEmotionPercentage(data1_a[i].emotion as any, score_candidate1, data2_a[i].emotion as any, score_candidate2)
        listHasil.push({
            name: province.find((v2) => v2.id == data1_a[i].provinceId )?.name,
            provinceId: data1_a[i].provinceId,
            candidate1,
            candidate2,
            emotion: emotion
        })
    }

    res.status(200).json(listHasil)
}

export default emotionalViewViaProvinceCoupleByDateCandidate