import client from "@/lib/prisma_db"
import 'colors'
import _ from "lodash"
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
                    trust: _.random(1, 100),
                    joy: _.random(1, 100),
                    surprise: _.random(1, 100),
                    anticipation: _.random(1, 100),
                    sadness: _.random(1, 100),
                    fear: _.random(1, 100),
                    anger: _.random(1, 100),
                    disgust: _.random(1, 100),
                    text: `
                    Prabowo adalah seorang politisi Indonesia yang bernama lengkap Prabowo Subianto Djojohadikusumo. Ia lahir pada tanggal 17 Oktober 1951. Prabowo memiliki latar belakang militer dan pernah menjadi seorang perwira tinggi di Tentara Nasional Indonesia (TNI), dengan jabatan terakhir sebagai Letnan Jenderal.
                    Selama kariernya di militer, Prabowo mengalami beberapa kontroversi, termasuk tuduhan pelanggaran hak asasi manusia selama periode transisi politik di Indonesia pada tahun 1998. Pada tahun 1998, ia juga diberhentikan dari jabatan militer dan kemudian mendirikan partai politik bernama Partai Gerakan Indonesia Raya (Gerindra).
                    `
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