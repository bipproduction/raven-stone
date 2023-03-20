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
        candidate: o[0].candidate,
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

    return hasil2
}

const nationWideRating = async (req: NextApiRequest, res: NextApiResponse) => {
    const { target1, target2 } = req.query
    // const listCandidate = await client.candidate.findMany({
    //     select: {
    //         id: true,
    //         name: true,
    //         img: true
    //     }
    // })

    // const dt = await getDataByCandidate('2023-03-16', 1)

    // const result = _.reduce(dt, (acc: any, item) => {
    //     _.forEach(item, (value, key) => {
    //         acc[key] = (acc[key] || 0) + value;
    //     });
    //     return acc;
    // }, {});

    // console.log(result)

    // const hasil5 = []
    // for (let itm of listCandidate) {
    //     const dataA = await getDataByCandidate("2023-03-16", itm.id)
    //     const dataB: SummedData = {
    //         value: sumBy(dataA, "value"),
    //         trust: sumBy(dataA, "trust"),
    //         anger: sumBy(dataA, "anger"),
    //         anticipation: sumBy(dataA, "anticipation"),
    //         disgust: sumBy(dataA, "disgust"),
    //         fear: sumBy(dataA, "fear"),
    //         joy: sumBy(dataA, "joy"),
    //         sadness: sumBy(dataA, "sadness"),
    //         surprise: sumBy(dataA, "surprise"),
    //     };

    //     hasil5.push({
    //         candidateId: itm.id,
    //         candidateName: itm.name,
    //         candidate1Img: itm.img,
    //         data: dataB
    //     })
    // }

    // 08970313644

    // const hasil6 = [];
    // for (let i = 0; i < hasil5.length - 1; i++) {
    //     const itm1 = hasil5[i];
    //     const subArray = hasil5.slice(i + 1);
    //     for (let itm2 of subArray) {
    //         const gabungan = {
    //             candidate1Id: itm1.candidateId,
    //             candidate2Id: itm2.candidateId,
    //             candidate1Name: itm1.candidateName,
    //             candidate2Name: itm2.candidateName,
    //             candidate1Img: itm1.candidateImg,
    //             candidate2Img: itm2.candidateImg,
    //             value: itm1.data.value,
    //             trust: itm1.data.trust + itm2.data.trust,
    //             anger: itm1.data.anger + itm2.data.anger,
    //             anticipation: itm1.data.anticipation + itm2.data.anticipation,
    //             disgust: itm1.data.disgust + itm2.data.disgust,
    //             fear: itm1.data.fear + itm2.data.fear,
    //             joy: itm1.data.joy + itm2.data.joy,
    //             sadness: itm1.data.sadness + itm2.data.sadness,
    //             surprise: itm1.data.surprise + itm2.data.surprise
    //         }
    //         hasil6.push(gabungan);
    //     }
    // }

    // const hasil6 = []
    // for (let itm1 of hasil5) {
    //     for (let itm2 of hasil5) {
    //         if (itm1.candidateId != itm2.candidateId) {
    //             const gabungan = {
    //                 candidate1Id: itm1.candidateId,
    //                 candidate2Id: itm2.candidateId,
    //                 candidate1Name: itm1.candidateName,
    //                 candidate2Name: itm2.candidateName,
    //                 candidate1Img: itm1.candidate1Img,
    //                 candidate2Img: itm2.candidate1Img,
    //                 value: itm1.data.value,
    //                 trust: itm1.data.trust + itm2.data.trust,
    //                 anger: itm1.data.anger + itm2.data.anger,
    //                 anticipation: itm1.data.anticipation + itm2.data.anticipation,
    //                 disgust: itm1.data.disgust + itm2.data.disgust,
    //                 fear: itm1.data.fear + itm2.data.fear,
    //                 joy: itm1.data.joy + itm2.data.joy,
    //                 sadness: itm1.data.sadness + itm2.data.sadness,
    //                 surprise: itm1.data.surprise + itm2.data.surprise
    //             }

    //             hasil6.push(gabungan)
    //         }
    //     }
    // }

    const data1 = await getDataByCandidate('2023-03-16', Number(target1))
    const hasil1 = _.reduce(data1, (acc, item) => {
        acc.value = acc.value + item.value
        acc.trust = acc.trust + item.trust
        acc.anger = acc.anger + item.anger
        acc.anticipation = acc.anticipation + item.anticipation
        acc.disgust = acc.disgust + item.disgust
        acc.fear = acc.fear + item.fear
        acc.joy = acc.joy + item.joy
        acc.sadness = acc.sadness + item.sadness
        acc.surprise = acc.surprise + item.surprise
        return acc
    })

    const data2 = await getDataByCandidate('2023-03-16', Number(target2))
    const hasil2 = _.reduce(data2, (acc, item) => {
        acc.value = acc.value + item.value
        acc.trust = acc.trust + item.trust
        acc.anger = acc.anger + item.anger
        acc.anticipation = acc.anticipation + item.anticipation
        acc.disgust = acc.disgust + item.disgust
        acc.fear = acc.fear + item.fear
        acc.joy = acc.joy + item.joy
        acc.sadness = acc.sadness + item.sadness
        acc.surprise = acc.surprise + item.surprise
        return acc
    })

    const data3 = [hasil1, hasil2]

    const data4 = _.reduce(data3, (acc: any, item) => {
        acc!.value = acc!.value
        acc!.trust = acc!.trust + item!.trust
        acc!.anger = acc!.anger + item!.anger
        acc!.anticipation = acc!.anticipation + item!.anticipation
        acc!.disgust = acc!.disgust + item!.disgust
        acc!.fear = acc!.fear + item!.fear
        acc!.joy = acc!.joy + item!.joy
        acc!.sadness = acc!.sadness + item!.sadness
        acc!.surprise = acc!.surprise + item!.surprise
        acc.total = acc!.trust + acc!.anger + acc!.anticipation + acc!.disgust + acc!.fear + acc!.joy + acc!.sadness + acc!.surprise
        return acc
    })

    res.status(200).json(data3)
}

export default nationWideRating