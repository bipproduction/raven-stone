import { NextApiRequest, NextApiResponse } from 'next';
import { seederUser } from './../../../../bin/perhitungan/seeder/seeder_user';
const apiSeederUser = async (req: NextApiRequest, res: NextApiResponse) => {
    const success = await seederUser()
    res.status(201).json({ success })
}

export default apiSeederUser