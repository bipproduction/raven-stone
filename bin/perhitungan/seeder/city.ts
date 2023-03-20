import client from '@/lib/prisma_db'
import city from './../city.json'

export const seederCity = async () => {
    const dataCity: any[] = city
    // await client.city.deleteMany({
    //     where: {
    //         id: {
    //             gt: 0
    //         }
    //     }
    // })
    // const sv = await client.city.createMany({
    //     data: dataCity.map((v) => ({
    //         id: Number(v.id),
    //         name: v.name,
    //         provinceId: Number(v.provinceId)
    //     })),
    //     skipDuplicates: true
    // })

    // console.log(sv.count)

    for (let itm of dataCity) {
        await client.city.upsert({
            where: {
                id: Number(itm.id)
            },
            create: {
                id: Number(itm.id),
                name: itm.name,
                provinceId: Number(itm.provinceId)
            },
            update: {
                name: itm.name,
                provinceId: Number(itm.provinceId)
            }
        })
    }

    console.log("seeder city success")
    return true
}