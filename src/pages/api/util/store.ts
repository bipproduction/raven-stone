import client from '@/lib/prisma_db';
import { NextApiRequest, NextApiResponse } from 'next';

const store = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const data = req.body
        await client.store.upsert({
            where: {
                name: data.name
            },
            create: {
                name: data.name,
                value: data.value
            },
            update: {
                value: data.value
            }
        })

        res.status(201).json({ success: true })
    }

    if (req.method === "GET") {
        const { name } = req.query
        const data = await client.store.findUnique({
            where: {
                name: name as string
            }
        })

        if (!data) return res.status(204).end()
        return res.status(200).json(data)
    }
}

export default store