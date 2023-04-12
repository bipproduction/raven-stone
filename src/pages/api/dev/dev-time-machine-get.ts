import client from "@/lib/prisma_db"
import { NextApiRequest, NextApiResponse } from "next"

const devTimeMachineGet = async (req: NextApiRequest, res: NextApiResponse) => {
    const { date, candidateId } = req.query
    const data = await client.dataContentByTime.findUnique({
        where: {
            date_candidateId: {
                date: new Date(date as any),
                candidateId: Number(candidateId)
            }
        }
    })

    res.status(200).json(data)
}

export default devTimeMachineGet