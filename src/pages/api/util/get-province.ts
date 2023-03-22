import client from '@/lib/prisma_db';
import { NextApiRequest, NextApiResponse } from 'next';
const getProvince = async (req: NextApiRequest, res: NextApiResponse) => {
    const data  = await client.province.findMany()
    res.status(200).json(data)
} 

export default getProvince