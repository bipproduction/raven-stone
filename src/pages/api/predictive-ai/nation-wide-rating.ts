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


const getDataByCandidate = async (date: any, candidateId: any) => {
    const data = await client.dataByContent.findMany({
        where: {
            date: new Date(date!.toString()),
            candidateId: candidateId
        },
        select: {
            Candidate: {
                select: {
                    name: true
                }
            },
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
        ..._.omit(v, ["City", "Province", "Candidate"]),
        candidate: v.Candidate?.name,
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
        // provinceId: o[0].provinceId,
        // name: o[0].provinceName,
        // candidate: o[0].candidate,
        // value: _.sumBy(o, 'value'),
        trust: _.sumBy(o, "trust"),
        anger: _.sumBy(o, "anger"),
        anticipation: _.sumBy(o, "anticipation"),
        disgust: _.sumBy(o, "disgust"),
        fear: _.sumBy(o, "fear"),
        joy: _.sumBy(o, "joy"),
        sadness: _.sumBy(o, "sadness"),
        surprise: _.sumBy(o, "surprise"),

    }))

    return hasil2
}

// trust
// joy
// surprise
// anticipation
// sadness
// fear
// anger
// disgust

const nationWideRating = async (req: NextApiRequest, res: NextApiResponse) => {
    const { target1, target2 } = req.query


    let k1 = await client.dataByContent.aggregate({
        where: {
            date: new Date("2023-03-16"),
            candidateId: Number(target1)
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
            date: new Date("2023-03-16"),
            candidateId: Number(target2)
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

    hasilProsentasePenggabungan['candidate1'] = Number(target1);
    hasilProsentasePenggabungan['candidate2'] = Number(target2);

    // console.log(hasilProsentasePenggabungan);

    res.status(200).json(hasilProsentasePenggabungan)
}

export default nationWideRating