import client from "@/lib/prisma_db";
import { NextApiRequest, NextApiResponse } from "next";

const devCityvalueTotalGet = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = await client.cityValue.aggregate({
        _sum: {
            value: true
        }
    })

    res.status(200).json(data._sum.value)
}

export default devCityvalueTotalGet