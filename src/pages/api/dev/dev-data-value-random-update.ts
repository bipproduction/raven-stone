import client from "@/lib/prisma_db";
import { NextApiRequest, NextApiResponse } from "next";


// trust
// joy
// surprise
// anticipation
// sadness
// fear
// anger
// disgust

export default async function devDataValueRandomUpdate(req: NextApiRequest, res: NextApiResponse) {
    if (req.method == "POST") {
        const body = req.body
        for (let item of body) {
            await client.dataByContent.update({
                where: {
                    id: item.id
                },
                data: {
                    trust: item.trust,
                    joy: item.joy,
                    surprise: item.surprise,
                    anticipation: item.anticipation,
                    sadness: item.sadness,
                    fear: item.fear,
                    anger: item.anger,
                    disgust: item.disgust,
                }
            })
        }

        res.status(201).json({
            success: true
        })
    }
}