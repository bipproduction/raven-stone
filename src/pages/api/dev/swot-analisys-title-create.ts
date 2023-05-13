import client from "@/lib/prisma_db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function swotAnalisysTitleCreate(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(403).end()
    const body = req.body

    await client.swotAnalisysName.upsert({
        where: {
            name: body.name
        },
        create: {
            name: body.name,
            category: body.category,
            sentiment:body.sentiment
        },
        update: {
            name: body.name,
            category: body.category,
            sentiment:body.sentiment
        }
    })

    res.status(201).end()

}