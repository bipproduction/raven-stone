import client from "@/lib/prisma_db"
import 'colors'
import _ from "lodash"

async function main() {
    const candidate = await client.candidate.findMany()
    const city = await client.city.findMany()

    const candidate1 = candidate
    const candidate2 = candidate
    const list_result: any = []

    for (let i of candidate1) {
        for (let j of candidate2) {
            if (i.id != j.id) {
                for (let k of city) {
                    const data = {
                        id: `${i.id}_${j.id}_${k.id}`,
                        candidate1Id: i.id,
                        candidate2Id: j.id,
                        cityId: k.id,
                        // city_name: k.name,
                        trust: _.random(1, 100),
                        joy: _.random(1, 100),
                        surprise: _.random(1, 100),
                        anticipation: _.random(1, 100),
                        sadness: _.random(1, 100),
                        fear: _.random(1, 100),
                        anger: _.random(1, 100),
                        disgust: _.random(1, 100)
                    }
                    // console.log(data)
                    // list_result.push(data)
                    await client.emotionViewProvinceCoupleV2.upsert({
                        where: {
                            id: data.id
                        },
                        update: data,
                        create: data
                    })

                    console.log(data.id)
                }
            }
        }
    }

    // console.log(list_result)
    // await client.emotionViewProvinceCoupleV2.createMany({ data: list_result })

}

main()

export { }