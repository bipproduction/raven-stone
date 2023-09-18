import client from "@/lib/prisma_db"
import { NextApiRequest, NextApiResponse } from "next"

export default async function swotAnalisysTitleDelete(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(403).end()
    const body = req.body

    await client.swotAnalisysName.delete({
        where: {
            id: Number(body.id)
        }
    })

    return res.status(201).end()
}