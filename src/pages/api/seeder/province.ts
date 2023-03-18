import { seederProvince } from './../../../../bin/perhitungan/seeder/province';
import { NextApiRequest, NextApiResponse } from 'next';
const province = async (req: NextApiRequest, res: NextApiResponse) => {
    const success = await seederProvince()
    res.status(200).json(success)
}

export default province