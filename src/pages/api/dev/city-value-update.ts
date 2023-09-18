import { NextApiRequest, NextApiResponse } from "next";
import city_value from './../../../../bin/perhitungan/city_value.json'
import client from "@/lib/prisma_db";

const cityValueUpdate = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const { jenis } = req.query

        if (jenis == "tambah") {
            await tambah(Number(jenis))
            return res.status(200).json({
                message: "Berhasil menambahkan data"
            })
        } else if (jenis == "kurang") {
            await kurang(Number(jenis))
            return res.status(200).json({
                message: "Berhasil mengurangi data"
            })

        } else if (jenis == "update") {
            const body = req.body
            await update(body)
            return res.status(200).json({
                message: "Berhasil mengupdate data"
            })

        } else {
            res.status(400).json({
                message: "Invalid request"
            })
        }

    }
}

const tambah = async (berapa: number) => {
    const data = city_value
    const newData = data.map((item: any) => {
        item.value = item.value + berapa
        return item
    })

    for (let item of newData) {
        client.cityValue.update({
            where: {
                id: item.id.toString()
            },
            data: {
                value: item.value
            }
        })

        console.log(`update city value : ${item.name}`)
    }

}

const kurang = async (berapa: number) => {
    const data = city_value
    const newData = data.map((item: any) => {
        item.value = item.value - berapa
        return item
    })

    for (let item of newData) {
        client.cityValue.update({
            where: {
                id: item.id.toString()
            },
            data: {
                value: item.value
            }
        })

        console.log(`update city value : ${item.name}`)
    }
}

const update = async (data: any) => {

}

export default cityValueUpdate