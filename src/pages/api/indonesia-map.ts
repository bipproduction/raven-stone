import { NextApiRequest, NextApiResponse } from "next";
import indonesia_map from './../../assets/indonesia_map.json'

const indonesiaMap = (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json(indonesia_map)
}

export default indonesiaMap