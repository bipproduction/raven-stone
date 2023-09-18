import client from '@/lib/prisma_db';
import { NextApiRequest, NextApiResponse } from 'next';
const cityContextDirectionUpdate = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "POST") {
        const body = req.body
        await client.cityContextDirection.update({
            where: {
                id: body.id
            },
            data: body
        })

        res.status(201).json({ succes: true })
    }
}
export default cityContextDirectionUpdate