import client from "@/lib/prisma_db";
import { NextApiRequest, NextApiResponse } from "next";

const candidateValueUpdate = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const body: any[] = req.body
        for (let itm of body) {
            await client.candidateValue.update({
                where: {
                    id: Number(itm.id)
                },
                data: {
                    value1: Number(itm.value1),
                    value2: Number(itm.value2)
                }
            })
        }

        res.status(201).json({ success: true })
    }
}

export default candidateValueUpdate