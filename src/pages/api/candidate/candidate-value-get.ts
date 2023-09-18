import client from "@/lib/prisma_db";
import _ from "lodash";
import { NextApiRequest, NextApiResponse } from "next";

const candidateValueGet = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = await client.candidateValue.findMany({
        select: {
            id: true,
            value1: true,
            value2: true,
            Candidate: {

                select: {
                    id: true,
                    name: true
                }
            }
        }
    })

    const hasil = data.map((v) => ({
        ..._.omit(v, ['Candidate', 'id']),
        id: v.Candidate?.id,
        name: v.Candidate?.name
    }))
    res.status(200).json(hasil)
}

export default candidateValueGet