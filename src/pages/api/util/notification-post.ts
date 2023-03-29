import client from '@/lib/prisma_db';
import { NextApiResponse } from 'next';
import { NextApiRequest } from 'next';
const notificationPost = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const data = req.body
        data.date = new Date(data.date)

        // console.log(data)
        await client.notification.create({ data })
        res.status(201).json({ success: true })
    }
}

export default notificationPost