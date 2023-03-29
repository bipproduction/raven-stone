import client from '@/lib/prisma_db';
import { NextApiRequest, NextApiResponse } from 'next';
const notificationdelete = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "DELETE") {
        const { id } = req.query
        const del = await client.notification.delete({
            where: {
                id: Number(id)
            }
        })

        res.status(201).json({ success: true })
    }
}

export default notificationdelete