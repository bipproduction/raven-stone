const age = require('./age.json')
const candidate = require('./candidate.json')
const city = require("./city.json")
const contextDirection = require('./contextDirection.json')
const economy = require('./economy.json')
const emotion = require('./emotion.json')
const gender = require('./gender.json')
const province = require('./province.json')
const fs = require('fs')
const _ = require('lodash')
const { json2tsv } = require('tsv-json')

const main = async () => {

    let listHasil = [];
    let id = 0;
    for (const can of candidate) {
        for (const cit of city) {
            for (const ag of age) {
                for (const contex of contextDirection) {
                    for (const eco of economy) {
                        for (const gen of gender) {
                            id++;
                            let mapEmo = {}
                            for (const emo of emotion) {
                                const dataEmo = {
                                    [_.lowerCase(emo.name)]: Math.floor(Math.random() * 20000) + 100
                                }
                                mapEmo = { ...mapEmo, ...dataEmo }
                            }
                            const data = {
                                id: Number(id),
                                provinceId: Number(province.find((v) => v.id == cit.provinceId).id),
                                candidateId: Number(can.id),
                                cityId: Number(cit.id),
                                ageId: Number(ag.id),
                                contextDirectionId: Number(contex.id),
                                economyId: Number(eco.id),
                                genderId: Number(gen.id),
                                ...mapEmo
                            }

                            listHasil.push(data)

                            // for (const emo of emotion) {
                            //     const data = {
                            //         id: Number(id),
                            //         provinceId: Number(province.find((v) => v.id == cit.provinceId).id),
                            //         candidateId: Number(can.id),
                            //         cityId: Number(cit.id),
                            //         ageId: Number(ag.id),
                            //         contextDirectionId: Number(contex.id),
                            //         economyId: Number(eco.id),
                            //         genderId: Number(gen.id),
                            //         emotionId: emo.id,
                            //         value: Math.floor(Math.random() * 200000) + 200
                            //     }

                            //     listHasil.push(data)
                            // }


                        }
                    }
                }
            }
        }
    }

    console.log(listHasil.length)
    fs.writeFileSync('./data_generate.json', JSON.stringify(listHasil, null, 2))
    const dataTsv = listHasil.map((v) => (Object.values(v)))
    dataTsv.unshift(Object.keys(listHasil[0]))
    const dataTsvString = dataTsv.map((v) => v.join('\t'))
    const dataTsvStringJoin = dataTsvString.join('\n')

    // console.log(dataTsvStringJoin)
    fs.writeFileSync('./data_generate.tsv', dataTsvStringJoin)


    console.log("success")

}

main();