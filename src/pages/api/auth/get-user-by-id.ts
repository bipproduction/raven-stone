import { NextApiRequest, NextApiResponse } from 'next';
import client from "@/lib/prisma_db"

const getUserById = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query
    const data = await client.user.findUnique({
        where: {
            id: id as any,

        },
        select: {
            name: true,
            userRoleId: true,
            isActive: true
        }
    })

    if (data?.isActive == false) {
        return res.status(404).json({ message: "User not found" })
    }

    return res.status(200).json(data ?? {})
}

export default getUserById