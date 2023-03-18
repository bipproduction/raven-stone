import { funGetDataSheet } from '@/lib/fun_get_data_sheet';
import client from '@/lib/prisma_db';
import _ from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';
const syncWordCloud = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = await funGetDataSheet("word_cloud")
    await client.wordCloud.deleteMany({ where: { id: { gt: 0 } } })
    await client.wordCloud.createMany({
        data: data.map((v: any) => ({
            ..._.omit(v, ['date']),
            word: v.word,
            value: v.value
        }))
    })
    res.status(200).json(data)
    
}

export default syncWordCloud