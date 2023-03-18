import { seederEmotion } from './../../../../bin/perhitungan/seeder/emotion';
import { NextApiRequest, NextApiResponse } from 'next';
const emotion = async (req: NextApiRequest, res: NextApiResponse) => {
    const success = await seederEmotion()
    res.status(200).json(success)
}

export default emotion