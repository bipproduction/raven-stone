import client from '@/lib/prisma_db'
import province from './../province.json'

export const seederProvince = async () => {

    // await client.province.deleteMany({ where: { id: { gt: 0 } } })
    // const dataProvince: any[] = province
    // await client.province.createMany({
    //     data: dataProvince.map((v) => ({
    //         id: Number(v.id),
    //         name: v.name
    //     })),
    //     skipDuplicates: true
    // })

    for (let itm of province) {
        await client.province.upsert({
            where: {
                id: Number(itm.id)
            },
            update: {
                name: itm.name
            },
            create: {
                name: itm.name
            }
        })
    }

    console.log("seeder province success")
    return true
}