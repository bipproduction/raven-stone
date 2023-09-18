import client from '@/lib/prisma_db';
import { NextApiRequest, NextApiResponse } from 'next';
const getCityContextDirection = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = await client.cityContextDirection.findMany()
    res.status(200).json(data)
}

export default getCityContextDirection