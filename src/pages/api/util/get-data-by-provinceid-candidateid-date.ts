import client from '@/lib/prisma_db';
import { NextApiRequest, NextApiResponse } from 'next';
const getDataByProvinceIdCandidateIdDate = async (req: NextApiRequest, res: NextApiResponse) => {
    const { provinceid, candidateid, date } = req.query
    console.log(provinceid, date, candidateid)
    if (!provinceid || !date || !candidateid) return res.status(402).end()
    const data = await client.dataByContent.findMany({
        where: {
            date: new Date(date as any),
            provinceId: Number(provinceid),
            candidateId: Number(candidateid)
        }
    })

    res.status(200).json(data)
}

export default getDataByProvinceIdCandidateIdDate