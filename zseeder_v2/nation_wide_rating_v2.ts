import client from "@/lib/prisma_db"
import 'colors'
import XLSX from 'xlsx'

async function main() {
    const candidate = await client.candidate.findMany()
    const candidate1 = candidate
    const candidate2 = candidate

    const listHasil: any[] = []
    for (let i in candidate1) {
        for (let j in candidate2) {
            if (candidate1[i].name != candidate2[j].name) {
                const data = {
                    id: `${i}_${j}`,
                    candidate_1_id: candidate1[i].id,
                    candidate_2_id: candidate2[j].id,
                    candidate_1_name: candidate1[i].name,
                    candidate_2_name: candidate2[j].name,
                    trust: 0,
                    joy: 0,
                    surprise: 0,
                    anticipation: 0,
                    sadness: 0,
                    fear: 0,
                    anger: 0,
                    disgust: 0,
                    rate: 0,
                    text: "text"
                }
                listHasil.push(data)
            }
        }
    }

    await client.nationWideRatingV2.deleteMany({ where: { id: 1 } })
    await client.nationWideRatingV2.createMany({
        data: {
            id: 1,
            data: listHasil
        }
    })

    console.log("success".green)
}

main()
export { }