import client from '@/lib/prisma_db'
import city from './../city.json'

export const seederCity = async () => {
    const dataCity: any[] = city

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

        console.log("seed city", itm.name)
    }

    console.log("seeder city success")
    return true
}