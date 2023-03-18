import client from '@/lib/prisma_db';
import { NextApiRequest, NextApiResponse } from 'next';
const getTop10ProvinceByConversation = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = await client.dataByContent.groupBy({
        by: ["provinceId"],
        _sum: {
            trust: true,
            anger: true,
            disgust: true,
            fear: true,
            anticipation: true,
            joy: true,
            sadness: true,
            surprise: true
        }
    })

    res.status(200).json(data)
}

export default getTop10ProvinceByConversation