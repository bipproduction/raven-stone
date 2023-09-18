import candidate from './candidate.json'
import emotion from './emotion.json'
import city from './city.json'
import fs from 'fs'
import _ from 'lodash'




const main = () => {
    let id = 0;
    let listHasil = []
    for (let can of candidate) {
        for (let ct of city) {
            id ++
            const data = {
                id: id,
                candidateId: Number(can.id),
                provinceId: Number(ct.provinceId),
                cityId: Number(ct.id),
                ...acak()
            }

            listHasil.push(data)
        }
    }

    fs.writeFileSync('data_emotion_v2.json', JSON.stringify(listHasil, null, 2), "utf-8")
    console.log("success")
}



const acak = () => {
    let sample = 100
    const listHasil = []
    for (let i = 0; i < 8; i++) {
        if (i < 7) {
            const data = Math.floor(Math.random() * (Math.floor(sample / 2))) + 1
            sample -= data
            listHasil.push(data)
        } else {
            listHasil.push(sample)
        }
    }

    let hasil = {}
    for (let e of _.shuffle(emotion)) {
        const data = {
            [_.lowerCase(e.name)]: listHasil[Number(e.id) - 1]
        }

        hasil = { ...hasil, ...data }

    }

    return hasil

}


main()


export { }