// import { gListCity } from './../../../src/g_state/g_list_city';
import client from '@/lib/prisma_db';
import _ from 'lodash';
import dataKab from './../data_kabupaten_v2.json'

export const seederContextDirection = async () => {
    const getCity = await client.cityValue.findMany({
        select: {
            id: true,
            value: true,
            cityId: true,
            City: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    })
    for (let dataKabupaten of dataKab) {
        const dataContextDirection: { [key: string]: any } = {
            pendidikan: dataKabupaten?.attributes.pendidikan,
            infrastruktur: dataKabupaten?.attributes.aparatur_p,
            layanan_kesehatan: dataKabupaten?.attributes.tenaga_kes,
            // keagamaan:
            //     Number(dataKabupaten?.attributes.islam ?? "0")
            // +
            // Number(dataKabupaten?.attributes.kristen ?? "0") +
            // Number(dataKabupaten?.attributes.katholik ?? "0") +
            // Number(dataKabupaten?.attributes.hindu ?? "0") +
            // Number(dataKabupaten?.attributes.budha ?? "0")
            // ,
            kemiskinan: dataKabupaten?.attributes.belum_tida,
            lapangan_pekerjaan: dataKabupaten?.attributes.belum_tama,
            keadilan_sosial: dataKabupaten?.attributes.wiraswasta,
        };

        const bd = {
            id: dataKabupaten.attributes.kabkotid,
            cityId: dataKabupaten.attributes.kabkotid,
            content: Object.keys(dataContextDirection).map((v: string) => ({
                name: v,
                value: dataContextDirection[v]
            }))
        }

        // if(bd.id == undefined){
        //     console.log(bd)
        // }
        const dataVal = getCity.find((v) => Number(v.cityId) == Number(bd.cityId))

        // console.log(dataVal?.value, dataKabupaten?.attributes.wajib_ktp)

        const nilai_total = Number(dataVal?.value)
        const data_item: any = bd.content

        console.log(data_item)
        // console.log(data_item)

        // Hitung total nilai dari data_item
        let total_value = 0;
        for (let i = 0; i < data_item.length; i++) {
            total_value += data_item[i].value;
        }

        // Hitung proporsi pengurangan untuk setiap nilai dari data_item
        let decrease_prop = (total_value - nilai_total) / total_value;

        // Kurangi nilai dari setiap data_item dengan proporsi yang sesuai
        for (let i = 0; i < data_item.length; i++) {
            let current_value = data_item[i].value;
            let decrease_value = current_value * decrease_prop;
            let new_value = Math.round(current_value - decrease_value);
            data_item[i].value = new_value;
            total_value -= decrease_value;
        }


        // console.log(nilai_total, _.sum(data_item.map((v: any) => v.value)));
        // console.log(data_item)

        await client.cityContextDirection.upsert({
            where: {
                id: Number(bd.id)
            },
            create: {
                id: Number(bd.id),
                cityId: Number(bd.cityId),
                content: data_item.content

            },
            update: {
                content: bd.content
            }
        })
    }

    return true
}

