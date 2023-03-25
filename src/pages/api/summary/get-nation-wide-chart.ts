import client from '@/lib/prisma_db';
import { NextApiRequest, NextApiResponse } from 'next';


// Joy
// Trust
// Fear
// Surprise
// Sadness
// Disgust
// Anger
// Anticipation
const getNationWideChart = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = await client.nationWideChart.findMany()
    // console.log(data)
    res.status(200).json(data)
}

export default getNationWideChart