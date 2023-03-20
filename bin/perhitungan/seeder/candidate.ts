import client from '@/lib/prisma_db'
import candidate from '../candidate.json'

export const seederCandidate = async () => {
    await client.candidate.deleteMany({ where: { id: { gt: 0 } } })
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