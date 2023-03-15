import client from '@/lib/prisma_db';
import { NextApiRequest, NextApiResponse } from 'next';
const getDataByCandidate = async (req: NextApiRequest, res: NextApiResponse) => {
    const { candidateId } = req.query
    const data = await client.dataByContent.findMany({
        where: {
            candidateId: Number(candidateId)
        },
        select: {
            id: true,
            City: {
                select: {
                    id: true,
                    name: true
                }
            },
            anger: true,
            disgust: true,
            fear: true,
            joy: true,
            sadness: true,
            surprise: true,
            trust: true,
            anticipation: true
        }
    })

    res.status(200).json(data)

}

export default getDataByCandidate