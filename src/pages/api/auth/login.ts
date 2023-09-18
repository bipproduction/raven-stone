import client from '@/lib/prisma_db';
import { NextApiRequest, NextApiResponse } from 'next';
const login = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const body = req.body
        const data = await client.user.findUnique({
            where: {
                email: body.email,
            },
            select: {
                id: true,
                email: true,
                name: true,
                password: true,
                userRoleId: true

            }
        })

        if (!data) {
            res.status(401).end()
        }


        if (data?.password != body.password) return res.status(401).end()

        return res.status(200).json({
            userId: data?.id,
            name: data?.name,
            userRoleId: data?.userRoleId
        })
    }

}

export default login