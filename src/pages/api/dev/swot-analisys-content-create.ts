import client from "@/lib/prisma_db"
import { NextApiRequest, NextApiResponse } from "next"

export default async function swotAnalisysContentCreate(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(403).end()
    const body = req.body
    await client.swotAnalisys.create({
        data: body
    })

    res.status(201).end()
}