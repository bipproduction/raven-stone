import client from '@/lib/prisma_db';
import { NextApiRequest, NextApiResponse } from 'next';
import user_role from './../../../../bin/perhitungan/user_role.json'
const seederUserRole = async (req: NextApiRequest, res: NextApiResponse) => {

    // await client.userRole.deleteMany({ where: { id: { gt: 0 } } })
    for (let itm of user_role) {
        await client.userRole.upsert({
            where: {
                id: itm.id
            }, create: {
                id: itm.id,
                name: itm.name
            },
            update: {
                id: itm.id,
                name: itm.name
            }
        })
    }

    res.status(200).json({ success: true })
}

export default seederUserRole