import client from "@/lib/prisma_db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function stepAnalisysDataDelete(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(403).end()
    const body = req.body
    await client.stepAnalisys.delete({
        where: {
            id: body.id
        }
    })

    return res.status(201).end()
}