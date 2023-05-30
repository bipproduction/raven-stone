import client from "@/lib/prisma_db";

export async function v3_api_data_update(req: any, res: any) {
    if (req.method != "POST") {
        return res.status(404).end()
    }

    const body = req.body;
    const data = await client.v3NationWideRating.update({
        where: {
            id: body.id
        },
        data: {
            trust: body.trust,
            joy: body.joy,
            surprise: body.surprise,
            anticipation: body.anticipation,
            sadness: body.sadness,
            fear: body.fear,
            anger: body.anger,
            disgust: body.disgust,
            rate: body.rate,
            text: body.text
        }
    })

    res.status(201).end()
}