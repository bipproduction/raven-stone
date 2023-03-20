import city from './city.json'
import fs from 'fs'

const main = async () => {
    const data = city.map((v) => ({
        ...v,
        value: Math.floor(Math.random() * 1000000) + 100000
    }))

    fs.writeFileSync('./city_value.json', JSON.stringify(data, null, 2))
    console.log("success")
}

main()

export { }