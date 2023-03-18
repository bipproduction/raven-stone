import { seederCity } from './../../../../bin/perhitungan/seeder/city';
import { NextApiRequest, NextApiResponse } from 'next';
const city = async (req: NextApiRequest, res: NextApiResponse) => {
    const success = await seederCity()
    res.status(200).json({ success })
}



export default city