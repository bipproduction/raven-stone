import client from '@/lib/prisma_db';
import city_value from '../city_value.json'

export const seederCityValue = async () => {
    const data = city_value.map((v) => ({
        cityId: Number(v.id),
        value: v.value
    }))

    await client.cityValue.createMany({ data })
    return true
}
