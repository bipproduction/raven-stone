import client from '@/lib/prisma_db';
import city_value from './city_value.json'


const main = async () => {
    const data = city_value.map((v) => ({
        cityId: Number(v.id),
        value: v.value
    }))

    await client.cityValue.createMany({ data })
    console.log("success")
}

main()

export { }