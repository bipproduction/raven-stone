import client from "@/lib/prisma_db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function stepAnalisysDataCreate(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(403).end()
    const body = req.body
    // console.log(body)
    await client.stepAnalisys.create({
        data: {
            candidateId: body.candidateId,
            stepAnalisysNameId: body.nameId,
            data: body.content,
            sentiment: body.sentimen
        }
    })

    return res.status(201).end()
}