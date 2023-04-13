import client from '@/lib/prisma_db';
import _ from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';

const perhitungan = ({
    emotion_candidate_1,
    emotion_candidate_2,
    peluang_candidate_1,
    peluang_candidate_2
}: {
    emotion_candidate_1: any,
    emotion_candidate_2: any,
    peluang_candidate_1: any,
    peluang_candidate_2: any
}) => {
    // const emotion_candidate_1: any = {
    //     anger: 3,
    //     anticipation: 4,
    //     disgust: 9,
    //     fear: 2,
    //     joy: 20,
    //     sadness: 2,
    //     trust: 49,
    //     surprise: 11
    //   }

    //   const emotion_candidate_2: any = {
    //     anger: 10,
    //     anticipation: 9,
    //     disgust: 4,
    //     fear: 7,
    //     joy: 40,
    //     sadness: 20,
    //     trust: 7,
    //     surprise: 20
    //   }

      const potensi_candidate_1: any = { president: peluang_candidate_1.value1, vice_president: peluang_candidate_1.value2 }
      const potensi_candidate_2: any = { president: peluang_candidate_1.value1, vice_president: peluang_candidate_2.value2 }

    // Gabungkan kedua kandidat menjadi satu objek baru
    const combined_emotions = { ...emotion_candidate_1, ...emotion_candidate_2 };

    // Hitung total nilai emosi untuk kandidat 1 dan kandidat 2
    const total_emotion_candidate_1: any = Object.values(emotion_candidate_1).reduce((a, b) => Number(a) + Number(b), 0);
    const total_emotion_candidate_2: any = Object.values(emotion_candidate_2).reduce((a, b) => Number(a) + Number(b), 0);

    // Hitung presentasi nilai emosi untuk kandidat 1 dan kandidat 2
    const percentage_emotion_candidate_1: any = Object.keys(emotion_candidate_1).reduce((acc: any, key) => {
        acc[key] = Math.round((emotion_candidate_1[key] / total_emotion_candidate_1) * potensi_candidate_1.president);
        return acc;
    }, {});

    const percentage_emotion_candidate_2 = Object.keys(emotion_candidate_2).reduce((acc: any, key) => {
        acc[key] = Math.round((emotion_candidate_2[key] / total_emotion_candidate_2) * potensi_candidate_2.president);
        return acc;
    }, {});

    // Gabungkan presentasi nilai emosi kedua kandidat menjadi satu objek baru
    const combined_percentage_emotions: any = { ...percentage_emotion_candidate_1, ...percentage_emotion_candidate_2 };

    // Hitung total presentasi nilai emosi untuk kedua kandidat
    const total_percentage_emotion: any = Object.values(combined_percentage_emotions).reduce((a, b) => Number(a) + Number(b), 0);

    // Hitung presentasi nilai untuk setiap emosi dalam objek baru
    const hasil_emotion_candidate1_dan_candidate2 = Object.keys(combined_percentage_emotions).reduce((acc: any, key) => {
        acc[key] = Math.round((combined_percentage_emotions[key] / total_percentage_emotion) * 100);
        return acc;
    }, {});

    return hasil_emotion_candidate1_dan_candidate2
}



const emotionViewViaProvinceCoupleByDateCandidateProvince = async (req: NextApiRequest, res: NextApiResponse) => {
    const { date, provinceId, candidateId1, candidateId2 } = req.query

    const data1 = await client.dataByContent.findMany({
        where: {
            date: new Date(date as any),
            provinceId: Number(provinceId) as any,
            candidateId: Number(candidateId1) as any
        },
        select: {
            City: {
                select: {
                    id: true,
                    name: true,
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
            disgust: true
        }
    })

    const data2 = await client.dataByContent.findMany({
        where: {
            date: new Date(date as any),
            provinceId: Number(provinceId) as any,
            candidateId: Number(candidateId1) as any
        },
        select: {
            City: {
                select: {
                    id: true,
                    name: true,
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
            disgust: true
        }
    })

    const kandidat1 = data1.map((v) => ({
        cityId: v.City?.id,
        cityName: v.City?.name,
        cityValue: v.City?.CityValue[0].value,
        emotion: {
            trust: v.anger,
            joy: v.anticipation,
            surprise: v.disgust,
            anticipation: v.fear,
            sadness: v.joy,
            fear: v.sadness,
            anger: v.trust,
            disgust: v.surprise,
        }
    }))

    const kandidat2 = data2.map((v) => ({
        cityId: v.City?.id,
        cityName: v.City?.name,
        cityValue: v.City?.CityValue[0].value,
        emotion: {
            trust: v.anger,
            joy: v.anticipation,
            surprise: v.disgust,
            anticipation: v.fear,
            sadness: v.joy,
            fear: v.sadness,
            anger: v.trust,
            disgust: v.surprise,
        }
    }))

    const candidateValue1 = await client.candidateValue.findUnique({
        where: {
            id: Number(candidateId1)
        },
        select: {
            value1: true,
            value2: true
        }
    })

    const candidateValue12 = await client.candidateValue.findUnique({
        where: {
            id: Number(candidateId2)
        },
        select: {
            value1: true,
            value2: true
        }
    })


    const listHail = []
    for (let i = 0; i < kandidat1.length; i++) {
        const dataNya = perhitungan({
            emotion_candidate_1: kandidat1[i].emotion,
            emotion_candidate_2: kandidat2[i].emotion,
            peluang_candidate_1: candidateValue1,
            peluang_candidate_2: candidateValue12
        })

        const body = {
            cityId: kandidat1[i].cityId,
            cityName: kandidat1[i].cityName,
            cityValue: kandidat1[i].cityValue,
            emotion: dataNya
        }

        listHail.push(body)

    }

    // console.log(listHail[0])

    res.status(200).json(listHail)

}

export default emotionViewViaProvinceCoupleByDateCandidateProvince