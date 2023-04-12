import client from "@/lib/prisma_db";
import { NextApiRequest, NextApiResponse } from "next";

const devTimeMachinePost = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const body = req.body

        const data = await client.dataContentByTime.upsert({
            where: {
                date_candidateId: {
                    candidateId: Number(body.candidateId),
                    date: new Date(body.date)
                }
            },
            create: {
                date: new Date(body.date),
                data: body.data,
                candidateId: body.candidateId
            },
            update: {
                data: body.data
            }
        })

        res.status(201).json({ success: true })
    }
}

export default devTimeMachinePost