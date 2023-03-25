import client from '@/lib/prisma_db'
import emotion from './../emotion.json'
import candidate from './../candidate.json'

export const seederEmotion = async () => {
    
    for (let itm of emotion) {
        await client.emotion.upsert({
            where: {
                id: Number(itm.id)
            },
            update: {
                id: Number(itm.id.toString()),
                name: itm.name
            },
            create: {
                id: Number(itm.id.toString()),
                name: itm.name
            }
        })
    }

    console.log("seeder emotion success")

    return true
}

