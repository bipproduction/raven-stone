import client from '@/lib/prisma_db';
import { NextApiRequest, NextApiResponse } from 'next';
const contextualDirectionLeaderPesonaPredictionGet = async (req: NextApiRequest, res: NextApiResponse) => {
    const { cityId } = req.query

    const data = await client.cityLeaderPersonaPrediction.findUnique({
        where: {
            cityId: Number(cityId)
        }
    })

    res.status(200).json(data)
}

export default contextualDirectionLeaderPesonaPredictionGet