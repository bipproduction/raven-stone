import client from "@/lib/prisma_db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const body = req.body;
        const data = await client.nationWideRatingV2.findUnique({
            where: {
                id: 1
            }
        })

        const index = (data?.data as []).findIndex((v: any) => v.id == body.id)
        const listData: any[] = data?.data as []
        listData[index] = body

        await client.nationWideRatingV2.update({
            where: {
                id: 1
            },
            data: {
                data: listData
            }
        })

        res.status(201).json(req.body);
    }
}