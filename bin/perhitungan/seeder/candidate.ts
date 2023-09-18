import client from '@/lib/prisma_db'
import candidate from '../candidate.json'

export const seederCandidate = async () => {
    // await client.candidate.deleteMany({ where: { id: { gt: 0 } } })
    // const dataCandidate = candidate
    // await client.candidate.createMany({
    //     data: dataCandidate.map((v) => ({
    //         id: Number(v.id),
    //         name: v.name,
    //         img: v.img
    //     })),
    //     skipDuplicates: true
    // })

    for (let itm of candidate) {
        await client.candidate.upsert({
            where: {
                id: Number(itm.id)
            },
            update: {
                name: itm.name,
                img: itm.img
            },
            create: {
                name: itm.name,
                img: itm.img
            }
        })
    }

    console.log("seeder candidate success")
    return true
}