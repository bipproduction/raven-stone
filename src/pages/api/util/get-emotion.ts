import client from '@/lib/prisma_db';
import { NextApiRequest, NextApiResponse } from 'next';
const getEmotion = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = await client.emotion.findMany()

    res.status(200).json(data)
}

export default getEmotion