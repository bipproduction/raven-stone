import { seederCityValue } from './../../../../bin/perhitungan/seeder/city_value';
import { NextApiRequest, NextApiResponse } from 'next';
const cityValue = async (req: NextApiRequest, res: NextApiResponse) => {
    const success = await seederCityValue()
    res.status(200).json(success)
}

export default cityValue