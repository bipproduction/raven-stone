import client from "@/lib/prisma_db";
import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";

const summaryTimeMachineDayget = async (req: NextApiRequest, res: NextApiResponse) => {
    const { date, candidateId } = req.query
    const data = await client.dataContentByTime.findUnique({
        where: {
            date_candidateId: {
                candidateId: Number(candidateId),
                date: new Date(moment(new Date()).subtract(1, 'days').format('YYYY-MM-DD'))
            }
        }
    })

    console.log(data)
    res.status(200).json(data)
}

export default summaryTimeMachineDayget
