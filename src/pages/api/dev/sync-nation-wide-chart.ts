import client from '@/lib/prisma_db';
import { funGetDataSheet } from '@/lib/fun_get_data_sheet';
import { NextApiRequest, NextApiResponse } from 'next';
import _ from 'lodash';
const getNationWideChart = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = await funGetDataSheet("nation_wide_chart_summary")

    // hapus dulu untuk membersihkan tabel
    await client.nationWideChart.deleteMany({
        where: {
            id: {
                gt: 0
            }
        }
    })

    // disisi ulang atau sync dari server
    await client.nationWideChart.createMany({
        data: data.map((v: any) => ({
            ..._.omit(v, ['date']),
            date: new Date(v.date)

        })), skipDuplicates: true
    })
    res.status(200).json({
        success: true
    })
}

export default getNationWideChart