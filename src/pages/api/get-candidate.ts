import client from '@/lib/prisma_db';
import { NextApiRequest, NextApiResponse } from 'next';
const getCandidate = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = await client.candidate.findMany()
    res.status(200).json(data)
}

export default getCandidate