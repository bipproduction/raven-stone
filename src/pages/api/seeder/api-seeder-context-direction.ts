import { NextApiRequest, NextApiResponse } from 'next';
import { seederContextDirection } from '../../../../bin/perhitungan/seeder/seeder_context_direction';
const apiSeederContextDirection = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = await seederContextDirection()
    res.status(200).json({ success: true })
}

export default apiSeederContextDirection