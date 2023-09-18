import { funGetDataSheet } from '@/lib/fun_get_data_sheet';
import client from '@/lib/prisma_db';
import _ from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';
const syncSourceOfMention = async (req: NextApiRequest, res: NextApiResponse) => {
    // ambil data dari sheet
    const data = await funGetDataSheet("source_of_mention")

    // bersihkan tabel
    await client.sourceOfMention.deleteMany({
        where: {
            id: {
                gt: 0
            }
        }
    })

    // isi ulang / sync
    await client.sourceOfMention.createMany({ data })

    res.status(200).json({
        success: true,
        data
    })
}

export default syncSourceOfMention