import client from "@/lib/prisma_db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function swotAnalisysTitleGet(req: NextApiRequest, res: NextApiResponse) {
    const data = await client.swotAnalisysName.findMany({
        select: {
            id: true,
            name: true,
            category: true
        }
    })

    res.status(200).json(data)
} 