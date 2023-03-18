import client from '@/lib/prisma_db'
import city from './../city.json'

export const seederCity = async () => {
    const dataCity: any[] = city
    await client.city.deleteMany({
        where: {
            id: {
                gt: 0
            }
        }
    })
    await client.city.createMany({
        data: dataCity.map((v) => ({
            id: Number(v.id),
            name: v.name,
            provinceId: Number(v.provinceId)
        })),
        skipDuplicates: true
    })
    
    return true
}