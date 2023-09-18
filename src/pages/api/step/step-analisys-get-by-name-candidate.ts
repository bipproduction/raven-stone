import client from "@/lib/prisma_db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function stepAnalisysGetByNameCandidate(req: NextApiRequest, res: NextApiResponse) {
    const { nameId, candidateId } = req.query
    const data = await client.stepAnalisys.findMany({
        where: {
            candidateId: Number(candidateId),
            stepAnalisysNameId: Number(nameId)
        },
        select: {
            id: true,
            sentiment: true,
            data: true
        }
    })

    res.status(200).json(data)
}