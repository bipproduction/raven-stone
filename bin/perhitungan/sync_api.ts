import { readdirSync, writeFileSync } from "fs"
import _ from "lodash"
import { join } from "path"

const w = (dir: string) => {
    const data: any[] = readdirSync(dir, { withFileTypes: true }).flatMap((file) => file.isDirectory() ? w(join(dir, file.name)) : join(dir, file.name))
    return data
}

const main = () => {
    const link = w('./../../src/pages/api').map((v) => v.replace('../../src/pages', '').replace('.ts', ''))
    const hasil: { [key: string]: any } = {}
    link.forEach((v) => {
        hasil[_.camelCase(v)] = v
    })

    writeFileSync('./../../src/lib/api.ts', 'export const api = ' + JSON.stringify(hasil, null, 2))
    console.log("success")
}

main()

export { }