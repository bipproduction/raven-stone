import client from '@/lib/prisma_db';
import province from './province.json'
import city from './city.json'
import emotion from './emotion.json'
import candidate from './candidate.json'
import data_emotion from './data_emotion.json'
import data_emotion_v2 from './data_emotion_v2.json'

const main = async () => {
    const dataProvince: any[] = province
    await client.province.createMany({
        data: dataProvince.map((v) => ({
            id: Number(v.id),
            name: v.name
        })),
        skipDuplicates: true
    })
    console.log("province success")

    const dataCity: any[] = city
    await client.city.createMany({
        data: dataCity.map((v) => ({
            id: Number(v.id),
            name: v.name,
            provinceId: Number(v.provinceId)
        })),
        skipDuplicates: true
    })
    console.log("city success")

    const dataEmotion: any[] = emotion
    await client.emotion.createMany({
        data: dataEmotion.map((v) => ({
            id: Number(v.id),
            name: v.name
        })),
        skipDuplicates: true
    })
    console.log("emotion success")

    const dataCandidate = candidate
    await client.candidate.createMany({
        data: dataCandidate.map((v) => ({
            id: Number(v.id),
            name: v.name,
        })),
        skipDuplicates: true
    })
    console.log("candidate success")

    // const dataDataEmotion = data_emotion
    // await client.dataEmotion.createMany({
    //     data: dataDataEmotion.map((v: any) => ({
    //         id: v.id,
    //         provinceId: v.provinceId,
    //         cityId: v.cityId,
    //         emotionId: v.emotionId,
    //         candidateId: v.candidateId,
    //         value: v.value
    //     })),
    //     skipDuplicates: true
    // })

    // console.log("data_emotion success")

    const dataEmotionV2 = data_emotion_v2
    await client.dataByContent.createMany({
        data: dataEmotionV2,
        skipDuplicates: true
    })
    console.log("data content success")

    
}

main()

export { }