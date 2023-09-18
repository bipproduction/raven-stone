import { seederEmotion } from './../../../../bin/perhitungan/seeder/emotion';
import { NextApiRequest, NextApiResponse } from 'next';
const emotion = async (req: NextApiRequest, res: NextApiResponse) => {
    const success = await seederEmotion()
    console.log("seeder emotion")
    res.status(200).json(success)
}

export default emotion