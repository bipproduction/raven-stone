import client from '@/lib/prisma_db'
import data_emotion_v2 from './../data_emotion_v2.json'

export const seederDataContent = async () => {
    const dataEmotionV2 = data_emotion_v2
    await client.dataByContent.deleteMany({
        where: {
            id: {
                gt: 0
            }
        }
    })
    await client.dataByContent.createMany({
        data: dataEmotionV2.map((v) => ({
            ...v,
            date: new Date("2023-03-16")
        })),
        skipDuplicates: true
    })
    return true
}