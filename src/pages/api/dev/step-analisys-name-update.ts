import client from "@/lib/prisma_db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function stepAnalisysNameUpdate(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(403).end()
    const body = req.body
    await client.stepAnalisysName.update({
        where: {
            id: body.id
        },
        data: {
            name: body.name
        }
    })

    return res.status(201).end()
}