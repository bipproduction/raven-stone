import client from "@/lib/prisma_db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function updateInsertContent(req: NextApiRequest, res: NextApiResponse) {
    const body: {
        type: string,
        data: any[]
    } = req.body
    if (!body.type || !body.data) return res.status(400).end()

    if (body.type == "update") {
        for (let itm of body.data) {
            await client.dataByContent.update({
                where: {
                    id: Number(itm.id)
                },
                data: itm
            })
        }

        res.status(201).end()
    }

    if (body.type == "insert") {
        await client.dataByContent.createMany({
            data: body.data
        })

        res.status(201).end()
    }

    return res.status(400).end()

}