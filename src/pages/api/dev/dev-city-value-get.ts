import client from "@/lib/prisma_db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function devCityValueGet(req: NextApiRequest, res: NextApiResponse) {
    const data = await client.cityValue.findMany({
        select: {
            id: true,
            value: true,
            City: {
                select: {
                    name: true
                }
            }
        }
    })

    const data2 = data.map((v) => {
        return {
            id: v.id,
            name: v.City?.name,
            value: v.value
        }
    })
    res.status(200).json(data2)
}