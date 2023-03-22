import client from '@/lib/prisma_db';
import { NextApiRequest, NextApiResponse } from 'next';
const updateDataByProvince = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const body = req.body

        for (let itm of body) {
            await client.dataByContent.update({
                where: {
                    id: itm.id
                },
                data: itm
            })
        }

        res.status(201).json({success: true})
    }
}

export default updateDataByProvince