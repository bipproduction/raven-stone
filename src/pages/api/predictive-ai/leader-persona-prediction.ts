import client from '@/lib/prisma_db';
import { NextApiRequest, NextApiResponse } from 'next';
const leaderPersonaPreddiction = async (req: NextApiRequest, res: NextApiResponse) => {
    const { cityId } = req.query
    const data = await client.cityLeaderPersonaPrediction.findUnique({
        where: {
            cityId: Number(cityId)
        }
    })

    res.status(200).json(data)
}

export default leaderPersonaPreddiction