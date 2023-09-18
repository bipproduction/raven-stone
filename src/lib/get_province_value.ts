import _ from "lodash"
import client from "./prisma_db"

export const getProvinceValue = async () => {
    const province = await client.province.findMany({
        select: {
            id: true,
            name: true,
            City: {
                select: {
                    id: true,
                    name: true,
                    CityValue: {
                        select: {
                            value: true
                        }
                    }
                }
            }
        }
    })

    const pro = province.map((v) => ({
        id: v.id,
        name: v.name,
        value: _.sumBy(v.City.map((v2) => ({
            data: _.sumBy(v2.CityValue, 'value')
        })), 'data')
    }))

    return pro
}