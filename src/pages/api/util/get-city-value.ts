import { NextApiRequest, NextApiResponse } from 'next';
import client from '@/lib/prisma_db';
import _ from 'lodash';
const getCityValue = async (req: NextApiRequest, res: NextApiResponse) => {

    const data = await client.cityValue.findMany({
        select: {
            City: {
                select: {
                    id: true,
                    name: true
                }
            },
            id: true,
            value: true
        }
    })
    res.status(200).json(data.map((v) => ({
        ..._.omit(v, ['City']),
        cityId: v.City?.id,
        city: v.City?.name
    })))
}

export default getCityValue