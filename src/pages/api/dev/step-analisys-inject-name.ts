import client from "@/lib/prisma_db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function stepAnalisysInjectName(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(403).end()
    const body = req.body
    for (let itm of body) {
        await client.stepAnalisysName.upsert({
            where: {
                name: itm
            },
            update: {
                name: itm
            },
            create: {
                name: itm
            }
        })
    }
    return res.status(201).end()
}