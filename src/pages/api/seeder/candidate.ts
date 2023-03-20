import { seederCandidate } from '../../../../bin/perhitungan/seeder/candidate';
import { NextApiRequest, NextApiResponse } from 'next';
const candidate = async (req: NextApiRequest, res: NextApiResponse) => {
    const success = await seederCandidate()
    res.status(200).json(success)
}

export default candidate