import moment from 'moment';
import client from '@/lib/prisma_db';
import { NextApiRequest, NextApiResponse } from 'next';
import _ from 'lodash';
const copyData = async (req: NextApiRequest, res: NextApiResponse) => {
    const { from, to } = req.query
    const data = await client.dataByContent.findMany({
        where: {
            date: new Date(from as any)
        }
    })

    const hasil = data.map((v) => ({
        ..._.omit(v, ['id']),
        date: new Date(to as any)
    }))

    await client.dataByContent.deleteMany({
        where: {
            date: new Date(to as any)
        }
    })

    await client.dataByContent.createMany({ data: hasil })

    // console.log(hasil)

    res.status(201).json({ success: true })
}

export default copyData