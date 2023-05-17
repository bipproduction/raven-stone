
import client from "@/lib/prisma_db"
import 'colors'
import _ from "lodash"
import fs from "fs"

async function main() {
    const province = await client.province.findMany()
    const candidate1 = await client.candidate.findMany()
    const candidate2 = await client.candidate.findMany()
    const list_result: any = []

    for (let i of candidate1) {
        for (let j of candidate2) {
            if (i.id != j.id) {
                for (let k of province) {
                    const data = {
                        id: `${i.id}_${j.id}_${k.id}`,
                        candidate1Id: i.id,
                        candidate2Id: j.id,
                        provinceId: k.id,
                        // province_name: k.name,
                        trust: _.random(1, 100),
                        joy: _.random(1, 100),
                        surprise: _.random(1, 100),
                        anticipation: _.random(1, 100),
                        sadness: _.random(1, 100),
                        fear: _.random(1, 100),
                        anger: _.random(1, 100),
                        disgust: _.random(1, 100)
                    }

                    // await client.emotionViewProvinceCoupleV2.upsert({
                    //     where: {
                    //         id: data.id
                    //     },
                    //     update: data,
                    //     create: data
                    // })

                    list_result.push(data)
                }
            }
        }
    }



    // console.log(list_result)
    // await client.emotionViewProvinceCoupleV2.createMany({ data: list_result })
    const sql = `INSERT INTO EmotionViewProvinceCoupleV2 (id, candidate1Id, candidate2Id, provinceId, trust, joy, surprise, anticipation, sadness, fear, anger, disgust) values ${list_result.map((v: any) => `('${v.id}', ${v.candidate1Id}, ${v.candidate2Id}, ${v.provinceId}, ${v.trust}, ${v.joy}, ${v.surprise}, ${v.anticipation}, ${v.sadness}, ${v.fear}, ${v.anger}, ${v.disgust})`).join(', ')}`
    fs.writeFileSync('emotion_view_province_couple.sql', sql)
}

main()

export { }