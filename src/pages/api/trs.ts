import Google from '@opentranslate/google'
import { NextApiRequest, NextApiResponse } from 'next'

const google = new Google({
    config: {
        apiAsFallback: true,
        concurrent: true,
        order: ["com", "cn"]
    }
})
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method != "POST") return res.status(400).end()
    const { text, from, to } = await req.body

    try {
        const result = await google.translate(text, from, to)
        return res.status(201).json({
            success: true,
            trans: result.trans.paragraphs[0]
        })
    } catch (error) {
        console.log(error)
        return res.status(204).end()
    }
}