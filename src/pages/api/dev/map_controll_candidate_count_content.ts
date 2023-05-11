import client from "@/lib/prisma_db";
import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";

export default async function mapControllCandidateCountContent(req: NextApiRequest, res: NextApiResponse) {
    const { date } = req.query
    if (!date) return res.status(403).end()
    const data: any = await client.candidate.findMany({
        select: {
            id: true,
            name: true,
        }
    })

    for (let itm of data) {
        itm['count'] = await client.dataByContent.count({
            where: {
                date: new Date(date as any),
            }
        })
    }


    res.status(200).json(data)

}