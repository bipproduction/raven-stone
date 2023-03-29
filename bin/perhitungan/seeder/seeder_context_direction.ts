import client from '@/lib/prisma_db';
import _ from 'lodash';
import dataKab from './../data_kabupaten_v2.json'

export const seederContextDirection = async () => {
    for (let dataKabupaten of dataKab) {
        const dataContextDirection: { [key: string]: any } = {
            pendidikan: dataKabupaten?.attributes.pendidikan,
            infrastruktur: dataKabupaten?.attributes.aparatur_p,
            layanan_kesehatan: dataKabupaten?.attributes.tenaga_kes,
            keagamaan:
                Number(dataKabupaten?.attributes.islam ?? "0") +
                Number(dataKabupaten?.attributes.kristen ?? "0") +
                Number(dataKabupaten?.attributes.katholik ?? "0") +
                Number(dataKabupaten?.attributes.hindu ?? "0") +
                Number(dataKabupaten?.attributes.budha ?? "0"),
            kemiskinan: dataKabupaten?.attributes.belum_tida,
            lapangan_pekerjaan: dataKabupaten?.attributes.belum_tama,
            keadilan_sosial: dataKabupaten?.attributes.wiraswasta,
        };

        const bd = {
            id: dataKabupaten.attributes.kabkotid,
            cityId: dataKabupaten.attributes.kabkotid,
            content: Object.keys(dataContextDirection).map((v: string) => ({
                name: v,
                value: 0
            }))
        }

        // if(bd.id == undefined){
        //     console.log(bd)
        // }

        await client.cityContextDirection.upsert({
            where: {
                id: Number(bd.id)
            },
            create: {
                id: Number(bd.id),
                cityId: Number(bd.cityId),
                content: bd.content

            },
            update: {
                content: bd.content
            }
        })
    }

    return true
}

