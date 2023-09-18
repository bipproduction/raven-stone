import { NextApiRequest, NextApiResponse } from 'next';
import nama_kabupaten from './../../assets/nama_kabupaten.json'
const namaKabupaten = async (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json(nama_kabupaten)
}

export default namaKabupaten