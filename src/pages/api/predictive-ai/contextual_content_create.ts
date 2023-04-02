import client from '@/lib/prisma_db';
import { NextApiRequest, NextApiResponse } from 'next';
const contextualContentCreate = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "POST") {
        const dataBody = req.body
        await client.contextualContent.create({
            data: {
                data: dataBody
            }
        })

        res.status(201).end()
    }
}

export default contextualContentCreate