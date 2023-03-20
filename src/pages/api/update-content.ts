import client from '@/lib/prisma_db';
import { NextApiRequest, NextApiResponse } from 'next';
const updateContent = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const body = req.body

        await client.dataByContent.update({
            where: {
                id: body.id
            },
            data: body
        })
        res.status(201).json(body)
    }
}

export default updateContent