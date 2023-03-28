import client from "@/lib/prisma_db";
import _, { sumBy } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";

type DataItem = {
    no: number;
    provinceId: number;
    name: string;
    candidate: string;
    value: number;
    trust: number;
    anger: number;
    anticipation: number;
    disgust: number;
    fear: number;
    joy: number;
    sadness: number;
    surprise: number;
};

type SummedData = Omit<DataItem, "no" | "provinceId" | "name" | "candidate">;


// const getDataByCandidate = async (date: any, candidateId: any) => {
//     const data = await client.dataByContent.findMany({
//         where: {
//             date: new Date(date!.toString()),
//             candidateId: candidateId
//         },
//         select: {
//             Candidate: {
//                 select: {
//                     name: true
//                 }
//             },
//             Province: {
//                 select: {
//                     id: true,
//                     name: true
//                 }
//             },
//             City: {
//                 select: {
//                     CityValue: {
//                         select: {
//                             value: true
//                         }
//                     }
//                 }
//             },
//             anger: true,
//             anticipation: true,
//             disgust: true,
//             fear: true,
//             joy: true,
//             sadness: true,
//             surprise: true,
//             trust: true,
//         },
//     })

//     const hasil = data.map((v) => ({
//         ..._.omit(v, ["City", "Province", "Candidate"]),
//         candidate: v.Candidate?.name,
//         provinceId: v.Province?.id,
//         provinceName: v.Province?.name,
//         value: v.City?.CityValue[0].value,
//         anger: Math.floor((v.anger! / 100) * v.City?.CityValue![0].value!),
//         anticipation: Math.floor((v.anticipation! / 100) * v.City?.CityValue![0].value!),
//         disgust: Math.floor((v.disgust! / 100) * v.City?.CityValue![0].value!),
//         fear: Math.floor((v.fear! / 100) * v.City?.CityValue![0].value!),
//         joy: Math.floor((v.joy! / 100) * v.City?.CityValue![0].value!),
//         sadness: Math.floor((v.sadness! / 100) * v.City?.CityValue![0].value!),
//         surprise: Math.floor((v.surprise! / 100) * v.City?.CityValue![0].value!),
//         trust: Math.floor((v.trust! / 100) * v.City?.CityValue![0].value!)
//     }))

//     const hasil2 = _.map(_.groupBy(hasil, "provinceId"), (o, idx) => ({
//         // provinceId: o[0].provinceId,
//         // name: o[0].provinceName,
//         // candidate: o[0].candidate,
//         // value: _.sumBy(o, 'value'),
//         trust: _.sumBy(o, "trust"),
//         anger: _.sumBy(o, "anger"),
//         anticipation: _.sumBy(o, "anticipation"),
//         disgust: _.sumBy(o, "disgust"),
//         fear: _.sumBy(o, "fear"),
//         joy: _.sumBy(o, "joy"),
//         sadness: _.sumBy(o, "sadness"),
//         surprise: _.sumBy(o, "surprise"),

//     }))

//     return hasil2
// }

// trust
// joy
// surprise
// anticipation
// sadness
// fear
// anger
// disgust

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

const nationWideRating = async (req: NextApiRequest, res: NextApiResponse) => {
    const { date, candidate1, candidate2 } = req.query


    let k1 = await client.dataByContent.aggregate({
        where: {
            date: new Date(date as string),
            candidateId: Number(candidate1)
        },
        _sum: {
            trust: true,
            joy: true,
            surprise: true,
            anticipation: true,
            sadness: true,
            fear: true,
            anger: true,
            disgust: true
        }
    })

    let k2 = await client.dataByContent.aggregate({
        where: {
            date: new Date(date as string),
            candidateId: Number(candidate2)
        },
        _sum: {
            trust: true,
            joy: true,
            surprise: true,
            anticipation: true,
            sadness: true,
            fear: true,
            anger: true,
            disgust: true,

        }
    })

    const kandidatA: any = k1._sum
    const kandidatB: any = k2._sum

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

    const score_candidate1: { [key: string]: any } = {}
    const score_candidate2: { [key: string]: any } = {}

    score_candidate1.president = candidateValue1?.value1 as any
    score_candidate1.vice_president = candidateValue1?.value2 as any

    score_candidate2.president = candidateValue12?.value1 as any
    score_candidate2.vice_president = candidateValue12?.value2 as any

    const emotion = calculateNewEmotionPercentage(kandidatA as any, score_candidate1, kandidatB as any, score_candidate2)

    // const data1 = await getDataByCandidate('2023-03-16', Number(target1))
    // const kandidatA: any = _.reduce(data1, (acc, item) => {
    //     // acc.value = acc.value + item.value
    //     acc.trust = acc.trust + item.trust
    //     acc.anger = acc.anger + item.anger
    //     acc.anticipation = acc.anticipation + item.anticipation
    //     acc.disgust = acc.disgust + item.disgust
    //     acc.fear = acc.fear + item.fear
    //     acc.joy = acc.joy + item.joy
    //     acc.sadness = acc.sadness + item.sadness
    //     acc.surprise = acc.surprise + item.surprise
    //     return acc
    // })

    // const data2 = await getDataByCandidate('2023-03-16', Number(target2))
    // const kandidatB: any = _.reduce(data2, (acc, item) => {
    //     // acc.value = acc.value + item.value
    //     acc.trust = acc.trust + item.trust
    //     acc.anger = acc.anger + item.anger
    //     acc.anticipation = acc.anticipation + item.anticipation
    //     acc.disgust = acc.disgust + item.disgust
    //     acc.fear = acc.fear + item.fear
    //     acc.joy = acc.joy + item.joy
    //     acc.sadness = acc.sadness + item.sadness
    //     acc.surprise = acc.surprise + item.surprise
    //     return acc
    // })

    // urutkan berdasarkan urutan yang benar kata kata dibawah ini
    // anger
    // anticipation
    // disgust
    // fear
    // joy
    // sadness
    // surprise
    // trust

    const hasilProsentasePenggabungan: any = {};

    // Menghitung persentase tiap emosi dari kedua kandidat
    Object.keys(kandidatA).forEach(key => {
        const persentaseA: any = kandidatA[key] / Number(Object.values(kandidatA).slice(1).reduce((a: any, b: any) => a + b)) * 100;
        const persentaseB: any = kandidatB[key] / Number(Object.values(kandidatB).slice(1).reduce((a: any, b: any) => a + b)) * 100;
        const persentaseGabungan: any = persentaseA + persentaseB - (persentaseA * persentaseB / 100);
        hasilProsentasePenggabungan[key] = Math.round(persentaseGabungan);
    });

    hasilProsentasePenggabungan['candidate1'] = Number(candidate1);
    hasilProsentasePenggabungan['candidate2'] = Number(candidate2);

    emotion['candidate1'] = Number(candidate1);
    emotion['candidate2'] = Number(candidate2);

    // console.log(hasilProsentasePenggabungan);

    // console.log(emotion)
    res.status(200).json(emotion)
}

// {
//     trust: 57,
//     joy: 44,
//     surprise: 34,
//     anticipation: 27,
//     sadness: 20,
//     fear: 16,
//     anger: 12,
//     disgust: 31,
//     candidate1: 1,
//     candidate2: 5
//   }

export default nationWideRating