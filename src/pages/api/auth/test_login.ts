import { NextApiRequest, NextApiResponse } from "next";
import { cookies } from 'next/headers'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader('Set-Cookie', ['_t=val1'])
    res.setHeader("Cache-Control", ['private', 'max-age=60', 'no-cache'])
    res.status(200).json({ succes: true })
}