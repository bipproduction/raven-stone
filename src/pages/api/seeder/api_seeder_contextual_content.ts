import { seederContextualContent } from './../../../../bin/perhitungan/seeder/seeder_contextual_content';
import { NextApiRequest, NextApiResponse } from 'next';
const apiSeederContextualContent = async (req: NextApiRequest, res: NextApiResponse) => {
    const isSuccess = await seederContextualContent()
    res.status(isSuccess ? 200 : 500).end()
}

export default apiSeederContextualContent