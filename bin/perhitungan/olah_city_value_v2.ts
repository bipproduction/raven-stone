import _ from 'lodash'
import city_value from './city_value_bak.json'
import fs from 'fs'

const main = () => {
    const value = city_value.map((v) => ({
        ..._.omit(v, ['value']),
        value: v.value - Math.round(((_.random(13, 15) / 100) * v.value))
    }))

    fs.writeFileSync('city_value.json', JSON.stringify(value, null, 2), "utf-8")
    console.log("generate city value v2 success")
}

main()

export { }