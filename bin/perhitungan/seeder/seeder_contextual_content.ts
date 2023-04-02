import client from '@/lib/prisma_db'
import contextual_content from './../contextual_content.json'

export const seederContextualContent = async () => {
    let id = 1
    for (let itm of contextual_content) {
        await client.contextualContent.upsert({
            where: {
                id: id
            },
            create: {
                id: id,
                data: itm
            },
            update: {
                data: itm
            }
        })

        id++;
    }


    return true
}
