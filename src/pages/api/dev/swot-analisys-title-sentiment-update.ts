import client from "@/lib/prisma_db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function devSwotAnalisysTitleSentimentUpdate(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(403).end()
    const body = req.body
    console.table(body)
    await client.swotAnalisysName.update({
        where: {
            id: Number(body.id)
        },
        data: {
            sentiment: body.sentiment
        }
    })

    res.status(201).end()
}