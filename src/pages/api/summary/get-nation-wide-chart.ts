import client from '@/lib/prisma_db';
import { NextApiRequest, NextApiResponse } from 'next';
const getNationWideChart = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = await client.nationWideChart.findMany()
    res.status(200).json(data)
}

export default getNationWideChart