import { NextApiRequest, NextApiResponse } from 'next';
import client from "@/lib/prisma_db"

const getUser = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query
    const data = await client.user.findUnique({
        where: {
            id: id as any
        },
        select: {
            name: true,
        }
    })

    res.status(200).json(data)
}

export default getUser