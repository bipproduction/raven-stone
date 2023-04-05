import client from '@/lib/prisma_db';
import _ from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';
const contextDirectiontetGet = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = await client.contextualContent.findMany({
        orderBy: {
            id: "desc",
        }
    })

    const sort = _.orderBy(data, 'data.audiences', 'desc')
    res.status(200).json(sort)
}

export default contextDirectiontetGet