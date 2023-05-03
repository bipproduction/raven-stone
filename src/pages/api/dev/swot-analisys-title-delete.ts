import client from "@/lib/prisma_db"
import { NextApiRequest, NextApiResponse } from "next"

export default async function swotAnalisysTitleDelete(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(403).end()
    const body = req.body
    const data = await client.swotAnalisys.findMany({
        where: {
            isActive: true
        },
    })

    for (let itm of data) {
        await client.swotAnalisys.update({
            where: {
                id: itm.id
            },
            data: {
                isActive: false
            }
        })
    }

    return res.status(201).end()
}