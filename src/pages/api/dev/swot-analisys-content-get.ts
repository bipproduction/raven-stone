import client from "@/lib/prisma_db";
import { NextApiRequest, NextApiResponse } from "next";
import 'colors'

export default async function swotAnalisysContentGet(req: NextApiRequest, res: NextApiResponse) {
    const { candidateId } = req.query

    console.log(candidateId)
    // console.log("SWOT GET".green)
    // console.table({
    //     candidateId,
    //     sentiment,
    //     category
    // })

    const data = await client.swotAnalisysName.findMany({
        select: {
            id: true,
            name: true,
            category: true,
            SwotAnalisys: {
                where: {
                    candidateId: Number(candidateId),
                    isActive: true,
                },
                select: {
                    id: true,
                    sentiment: true,
                    content: true
                }
            }
        }
    })

    res.status(200).json(data)
}