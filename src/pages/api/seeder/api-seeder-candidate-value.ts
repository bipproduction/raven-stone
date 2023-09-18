import { seederCandidateValue } from './../../../../bin/perhitungan/seeder/candidate_value';
import { NextApiRequest, NextApiResponse } from 'next';
const apiSeederCandidateValue = async (req: NextApiRequest, res: NextApiResponse) => {
    const success = await seederCandidateValue()
    res.status(200).json(success)
}

export default apiSeederCandidateValue