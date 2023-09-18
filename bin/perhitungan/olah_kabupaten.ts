import data_kabupaten from './data_kabupaten.json'
import {json2tsv} from 'tsv-json'
import fs from 'fs'

export interface ModelKabupaten {
    objectid: number;
    provinsi: string;
    kabkot: string;
    jumlah_kec: number;
    jumlah_des: number;
    jumlah_kel: number;
    jumlah_pen: number;
    jumlah_kk: number;
    luas_wilay: number;
    kepadatan_: number;
    perpindaha: number;
    jumlah_men: number;
    perubahan_: number;
    wajib_ktp: number;
    islam: number;
    kristen: number;
    katholik: number;
    hindu: number;
    budha: number;
    konghucu: number;
    kepercayaa: number;
    pria: number;
    wanita: number;
    belum_kawi: number;
    kawin: number;
    cerai_hidu: number;
    cerai_mati: number;
    u0: number;
    u5: number;
    u10: number;
    u15: number;
    u20: number;
    u25: number;
    u30: number;
    u35: number;
    u40: number;
    u45: number;
    u50: number;
    u55: number;
    u60: number;
    u65: number;
    u70: number;
    u75: number;
    lahir_thn3: number;
    lahir_seb3: number;
    pertumbuha: number;
    pertumbuh2: number;
    pertumbuh3: number;
    pertumbuh4: number;
    pertumbuh5: number;
    pendidikan: number;
    pendidika2: number;
    pendidika3: number;
    pendidika4: number;
    pendidika5: number;
    pendidika6: number;
    tidak_belu: number;
    belum_tama: number;
    tamat_sd: number;
    sltp: number;
    slta: number;
    diploma_i_: number;
    diploma_ii: number;
    diploma_iv: number;
    strata_ii: number;
    strata_iii: number;
    a: number;
    b: number;
    ab: number;
    o: number;
    a_: number;
    a_2: number;
    b_: number;
    b_2: number;
    ab_: number;
    ab_2: number;
    o_: number;
    o_2: number;
    tidak_di_k: number;
    belum_tida: number;
    aparatur_p: number;
    tenaga_pen: number;
    wiraswasta: number;
    pertanian_: number;
    nelayan: number;
    agama_dan_: number;
    pelajar_ma: number;
    tenaga_kes: number;
    pensiunan: number;
    lainnya: number;
    generated_: string;
    f4_18_tahun_pendidikan_khusus: number;
    f5_6_tahun_paud: number;
    f7_12_tahun_sd: number;
    f12_15_tahun_smp: number;
    f16_18_tahun_sma: number;
}

const data: any = data_kabupaten
const listData: any[] = data.features
let listHasil = []
for (let itm of listData) {
    const listKey = Object.keys(itm.attributes)
    let listWadah = {}
    for (let lk of listKey) {
        const ky: any = lk.split('.')[3]
        const aData = {
            [ky]: itm.attributes[lk]
        }
        listWadah = { ...listWadah, ...aData }
    }

    listHasil.push(listWadah)
}

listHasil.shift()
console.log(listHasil.length)
const body = listHasil.map((v) => Object.values(v))
body.unshift(Object.keys(listHasil[0]))
const tsv = body.map((v) => v.join('\t')).join('\n')

fs.writeFileSync('data_kabupaten.tsv', tsv, "utf-8")
console.log("success")

export { }