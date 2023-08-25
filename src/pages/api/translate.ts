import translate from "google-translate-api-x";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != "POST") return res.status(400).end()
    const { text, from, to } = await req.body

    try {
        const data = await translate(text as string, { from, to })

        return res.status(201).json({
            success: true,
            text: data.text
        })
    } catch (error) {
        console.log(error)
        return res.status(204).end()
    }


}