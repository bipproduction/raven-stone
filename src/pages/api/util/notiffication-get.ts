import client from '@/lib/prisma_db';
import { NextApiRequest, NextApiResponse } from 'next';
const notificationGet = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = await client.notification.findMany({
        take: 20,
        orderBy: {
            createdAt: "desc"
        }
    })

    res.status(200).json(data)
}

export default notificationGet