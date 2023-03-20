import client from '@/lib/prisma_db'
import emotion from './../emotion.json'
import candidate from './../candidate.json'

export const seederEmotion = async () => {
    await client.emotion.deleteMany({ where: { id: { gt: 0 } } })
    const dataEmotion: any[] = emotion
    await client.emotion.createMany({
        data: dataEmotion.map((v) => ({
            id: Number(v.id),
            name: v.name
        })),
        skipDuplicates: true
    })

    return true
}

