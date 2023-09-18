import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/lib/prisma_db';
const wordCloudGet = async (req: NextApiRequest, res: NextApiResponse) => {
    const { cityId } = req.query
    // console.log(cityId)
    const data = await client.cityWordCloud.findUnique({
        where: {
            cityId: Number(cityId)
        }
    })

    res.status(200).json(data)
}

export default wordCloudGet