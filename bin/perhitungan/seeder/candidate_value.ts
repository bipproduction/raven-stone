import client from '@/lib/prisma_db'
import candidate_value from './../candidate_value.json'

export const seederCandidateValue = async () => {
    for (let itm of candidate_value) {
        await client.candidateValue.upsert({
            where: {
                id: itm.id
            },
            create: itm,
            update: itm
        })
    }

    return true
}