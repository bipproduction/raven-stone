import client from '@/lib/prisma_db';
import city_value from '../city_value.json'

export const seederCityValue = async () => {
    // await client.cityValue.deleteMany({ where: { id: { gt: 0 } } })
    // const data = city_value.map((v) => ({
    //     cityId: Number(v.id),
    //     value: v.value
    // }))

    // await client.cityValue.createMany({ data })

    for (let itm of city_value) {
        await client.cityValue.upsert({
            where: {
                id: Number(itm.id)
            },
            update: {
                cityId: Number(itm.id),
                value: Number(itm.value),
            },
            create: {
                cityId: Number(itm.id),
                value: Number(itm.value)
            }
        })

        console.log("seed city value ", itm.name)
    }

    console.log("seeder city value success")
    return true
}
