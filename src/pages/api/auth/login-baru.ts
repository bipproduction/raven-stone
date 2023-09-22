import client from '@/lib/prisma_db';
import { NextApiRequest, NextApiResponse } from 'next';
const loginBaru = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const body = req.body
        const data = await client.user.findFirst({
            where: {
                email: body.email,
                isLogin: false,
                isActive: true
            },
            select: {
                id: true,
                email: true,
                name: true,
                phone: true,
                password: true,
                userRoleId: true

            }
        })

        if (!data) {
            res.status(204).end()
        }

        if (data?.password != body.password) return res.status(204).end()


        return res.status(200).json({
            userId: data?.id,
            name: data?.name,
            phone: data?.phone,
            userRoleId: data?.userRoleId
        })
    }

}

export default loginBaru