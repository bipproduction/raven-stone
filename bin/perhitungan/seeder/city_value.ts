import client from '@/lib/prisma_db';
import city_value from '../city_value.json'

export const seederCityValue = async () => {
    await client.cityValue.deleteMany({ where: { id: { gt: 0 } } })
    const data = city_value.map((v) => ({
        cityId: Number(v.id),
        value: v.value
    }))

    await client.cityValue.createMany({ data })
    return true
}
