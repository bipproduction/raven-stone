import client from "@/lib/prisma_db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function devCityValueUpdate(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "POST") {
        const body = req.body

        await client.cityValue.update({
            where: {
                id: body.id
            },
            data: {
                value: body.value
            }
        })

        res.status(201).json({ success: true })
    }
}