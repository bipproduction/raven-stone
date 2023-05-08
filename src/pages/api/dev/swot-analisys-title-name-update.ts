import client from "@/lib/prisma_db"
import { NextApiRequest, NextApiResponse } from "next"

export default async function swotAnalisysTitleNameUpdate(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(403).end()
    await client.swotAnalisysName.update({
        where: {
            id: Number(req.body.id)
        },
        data: {
            name: req.body.name
        }
    })
    res.status(201).end()
}