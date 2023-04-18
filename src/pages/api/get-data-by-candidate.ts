import client from '@/lib/prisma_db';
import { NextApiRequest, NextApiResponse } from 'next';
import moment from 'moment';
import _ from 'lodash';


const getDataByCandidate = async (req: NextApiRequest, res: NextApiResponse) => {
    const { candidateId, date } = req.query
    // console.log(date)
    const data = await client.dataByContent.findMany({
        where: {
            candidateId: Number(candidateId),
            date: new Date(date as any)
        },
        select: {
            id: true,
            City: {
                select: {
                    id: true,
                    name: true,
                    CityValue: {
                        select: {
                            value: true
                        }
                    }
                }
            },
            trust: true,
            joy: true,
            surprise: true,
            anticipation: true,
            sadness: true,
            fear: true,
            anger: true,
            disgust: true
        }
    })

    res.status(200).json(data)

}

export default getDataByCandidate