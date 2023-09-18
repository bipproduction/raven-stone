import client from "@/lib/prisma_db";
import _ from "lodash";
import { NextApiRequest, NextApiResponse } from "next";

export default async function stepAnalisysDataGet(req: NextApiRequest, res: NextApiResponse) {
    const { candidateId } = req.query
    const data = await client.stepAnalisys.findMany({
        where: {
            candidateId: Number(candidateId)
        },
        select: {
            data: true,
            sentiment: true,
            StepAnalisysName: {
                select: {
                    name: true
                }
            },
            createdAt: true,
        }
    })

    const hasil = _.groupBy(data, (d) => d.StepAnalisysName?.name);

    res.status(200).json(hasil)
}