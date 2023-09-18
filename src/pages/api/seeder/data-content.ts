import { seederDataContent } from './../../../../bin/perhitungan/seeder/data_content';
import { NextApiRequest, NextApiResponse } from 'next';
const dataContent = async (req: NextApiRequest, res: NextApiResponse) => {
    const success = await seederDataContent()
    res.status(200).json(success)
}

export default dataContent