import client from '@/lib/prisma_db';
import { NextApiRequest, NextApiResponse } from 'next';
const getSourceofmention = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = await client.sourceOfMention.findMany()
    res.status(200).json(data)
}

export default getSourceofmention