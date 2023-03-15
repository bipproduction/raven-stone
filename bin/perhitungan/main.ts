import fetch from 'node-fetch'
import fs from 'fs'
import client from '@/lib/prisma_db'
import Db from 'simple-json-db'
const store = new Db('./store.json')

// store.set("offset", 20)
// console.log(store.get("offset"))

const main = async () => {
    const count = 83769
    const listHasil = []
    const banyak = 1000

    for (let offset = store.get('offset') ?? 0; offset < count; offset++) {


        if (offset % banyak == 0) {
            const res = await fetch(`https://gis.dukcapil.kemendagri.go.id/arcgis/rest/services/Data_Baru_26092017/MapServer/3/query?f=json&where=1=1&returnGeometry=false&spatialRel=esriSpatialRelIntersects&outFields=*&orderByFields=giskemendagri.gisadmin.Desa_Spasial_22092017.objectid ASC&resultOffset=${offset}&resultRecordCount=${banyak}`)
            const data: any = await res.json()
            // const dataHasil = data.features[0].attributes

            for (let itm of data.features) {
                let listini: any = {}
                const listKey = Object.keys(itm.attributes)
                for (let lk of listKey) {
                    const ky: any = lk.split('.')[3]
                    const aData = {
                        [ky]: itm.attributes[lk]
                    }
                    listini = { ...listini, ...aData }
                }

                listini.test_luas_desa_luas = listini.test_luas_desa_luas ? listini.test_luas_desa_luas.toString() : "0"
                listini.luas_wilay = listini.luas_wilay ? listini.luas_wilay.toString() : "0"
                listini.kepadatan_ = listini.kepadatan_ ? listini.kepadatan_.toString() : "0"
                listini.f4_18_tahun_pendidikan_khusus = listini.f4_18_tahun_pendidikan_khusus ? listini.f4_18_tahun_pendidikan_khusus.toString() : ""
                listini.f7_12_tahun_sd = listini.f7_12_tahun_sd ? listini.f7_12_tahun_sd.toString() : "0"


                const dataSimpan = await client.dukcapilDesa.upsert({
                    create: {
                        ...listini as any
                    },
                    update: {
                        ...listini
                    },
                    where: {
                        kode201701: listini.kode201701 as any
                    }
                })
            }

            store.set('offset', offset)
            // console.log("objectid: " + dataSimpan.objectid, "offet: " + offset)
        }

        // if (berapa > 0) return
    }
    // console.log(JSON.stringify(data, null, 4))
    // fs.writeFileSync('data_desa.json', JSON.stringify(listHasil, null, 2))
    // console.log(listHasil)
}

main()

export { }

