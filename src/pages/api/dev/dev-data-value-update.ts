import client from "@/lib/prisma_db";
import _ from "lodash";
import { NextApiRequest, NextApiResponse } from "next";

export default async function devDataValueUpdate(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const body = req.body
        const data = _.omit(body, ['City', 'isSelected'])

        await client.dataByContent.update({
            where: {
                id: data.id
            },
            data: data
        })
        res.status(201).json(body)
    }
} 