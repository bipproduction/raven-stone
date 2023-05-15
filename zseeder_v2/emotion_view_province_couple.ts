import client from "@/lib/prisma_db"
import 'colors'

async function main() {
    const candidate = await client.candidate.findMany()
    const city = await client.city.findMany()

    const candidate1 = candidate
    const candidate2 = candidate
    const list_result: any = []
    
    for (let i of candidate1) {
        for (let j of candidate2) {
            for (let k of city) {
                if (i.name != j.name) {
                    const data = {
                        id: `${i.id}_${j.id}_${k.id}`,
                        candidate1Id: i.id,
                        candidate2Id: j.id,
                        cityId: k.id,
                        // city_name: k.name,
                        trust: 0,
                        joy: 0,
                        surprise: 0,
                        anticipation: 0,
                        sadness: 0,
                        fear: 0,
                        anger: 0,
                        disgust: 0
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