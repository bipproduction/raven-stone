import client from '@/lib/prisma_db';
import _ from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';
export default async function handler(RequiredKeys: NextApiRequest, res: NextApiResponse) {
    const data = await client.nationWideRatingV2.findUnique({
        where: {
            id: 1
        }
    })

    // const data2: any[] = data?.data as []
    // const result: any[] = data2.map((v) => ({
    //     ..._.omit(v, ['candidate_1_id', 'candidate_2_id', 'candidate_1_name', 'candidate_2_name', 'rate', 'text']),
    //     candidate_1_id: Number(v.candidate_1_id),
    //     candidate_2_id: Number(v.candidate_2_id),
    //     candidate_1_name: v.candidate_1_name,
    //     candidate_2_name: v.candidate_2_name,
    //     rate: Number(v.rate),
    //     text: v.text,
    // }))

    res.status(200).json(data?.data)
}