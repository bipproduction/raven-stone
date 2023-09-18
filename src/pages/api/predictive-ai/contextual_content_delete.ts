import client from '@/lib/prisma_db';
import { NextApiRequest, NextApiResponse } from 'next';
const contextualContentDelete = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const body = req.body
        console.log(body.id)
        await client.contextualContent.delete({
            where: {
                id: Number(body.id)
            }
        })

        res.status(201).end()
    }
}

export default contextualContentDelete