import client from '@/lib/prisma_db';
import { NextApiRequest, NextApiResponse } from 'next';
const contextualContentUpdate = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const dataBody = req.body

        await client.contextualContent.update({
            where: {
                id: dataBody.id
            },
            data: {
                data: dataBody.data
            }
        })

        res.status(201).json({ sucess: true, message: "data success update" })
    }

}

export default contextualContentUpdate