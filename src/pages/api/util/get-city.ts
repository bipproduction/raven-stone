import client from '@/lib/prisma_db';
import { NextApiRequest, NextApiResponse } from 'next';
const getCity = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = await client.city.findMany()

    // console.log(data)
    res.status(200).json(data)
}

export default getCity