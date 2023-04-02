import client from '@/lib/prisma_db';
import { NextApiRequest, NextApiResponse } from 'next';
const contextDirectiontetGet = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = await client.contextualContent.findMany({
        orderBy: {
            id: "desc"
        }
    })

    // console.log(data.data)
    res.status(200).json(data)
}

export default contextDirectiontetGet