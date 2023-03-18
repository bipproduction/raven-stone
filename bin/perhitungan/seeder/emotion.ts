import client from '@/lib/prisma_db'
import emotion from './../emotion.json'
import candidate from './../candidate.json'

export const seederEmotion = async () => {
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

    return true
}

