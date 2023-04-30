import client from "@/lib/prisma_db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function stepAnalisysLoadListName(req: NextApiRequest, res: NextApiResponse) {
    const data = await client.stepAnalisysName.findMany({
        orderBy: {
            createdAt: "desc"
        },
        select: {
            id: true,
            name: true,
            _count: {
                select: {
                    StepAnalisys: true
                }
            }
        }
    })
    res.status(200).json(data)
}