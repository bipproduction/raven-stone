import candidate from './candidate.json'
import emotion from './emotion.json'
import city from './city.json'
import fs from 'fs'

const main = () => {
    let id = 0;
    let listHasil = []
    for (let can of candidate) {
        for (let ct of city) {
            for (let emo of emotion) {
                id++;
                let data = {
                    id: id,
                    candidateId: Number(can.id),
                    provinceId: Number(ct.provinceId),
                    cityId: Number(ct.id),
                    emotionId: Number(emo.id),
                    value: Math.floor(Math.random() * 100)
                }

                listHasil.push(data)

            }
        }
    }

    fs.writeFileSync('data_emotion.json', JSON.stringify(listHasil, null, 2), "utf-8")
    console.log("success")
}

main()
export { }