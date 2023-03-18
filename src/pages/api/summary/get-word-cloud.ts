import client from '@/lib/prisma_db';
import _ from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';
const getWordCloud = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = await client.wordCloud.findMany()
    res.status(200).json(data.map((v) => ({
        ..._.omit(v, ['word']),
        text: v.word
    })))
}

export default getWordCloud