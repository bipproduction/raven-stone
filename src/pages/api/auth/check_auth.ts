import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from 'next/headers'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const c = req.cookies

    const t = JSON.parse(JSON.stringify(c))
    // console.log(t)
    return res.status(200).json(req.headers)
}