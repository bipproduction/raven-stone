import client from "@/lib/prisma_db"
import { NextApiRequest, NextApiResponse } from "next"

const updIsLogin = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const body = req.body
        const upd = await client.user.update({
            where: {
                id: body.id,
            },
            data: {
                isLogin: body.isLogin
            }
        })

        // 'Set-Cookie': `accessToken=${accessToken}; HttpOnly; Max-Age=86400; Path=/
        // res.setHeader('set-cookie', ['_t=val2'])

        return res.status(200).end()
    }

}

export default updIsLogin