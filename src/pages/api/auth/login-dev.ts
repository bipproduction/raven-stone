import client from '@/lib/prisma_db';
import { NextApiRequest, NextApiResponse } from 'next';
const loginDev = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const { email, password } = req.body

        if (email != "wibu_dev@bip.com") res.status(203).end()
        const data = await client.user.findUnique({
            where: {
                email: email
            },
        })

        if (email == data?.email && password == data?.password) {
            return res.status(201).json({ id: data?.id })
        }

        return res.status(402).end()
    }
}

export default loginDev