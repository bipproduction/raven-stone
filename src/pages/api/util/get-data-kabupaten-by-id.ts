import _ from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';
import data_kabupaten from '../../../../bin/perhitungan/data_kabupaten_v2.json'
const getDataKabupatenById = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query
    const data = _.find(data_kabupaten, (v) => v.attributes.kabkotid == id)
    res.status(200).json(data)
}

export default getDataKabupatenById