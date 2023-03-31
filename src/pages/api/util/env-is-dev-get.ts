import { NextApiRequest, NextApiResponse } from 'next';
const envDevGet = async (req: NextApiRequest, res: NextApiResponse) => {


    res.status(200).send(req.headers.host == "localhost:3000")
}

export default envDevGet