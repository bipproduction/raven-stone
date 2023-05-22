import client from "@/lib/prisma_db"

export async function v3_api_csv_update(req: any, res: any) {
    if (req.method != "POST") {
        return res.status(400).end()
    }

    const body: any[] = req.body

    for(let itm of body){
        await client.v3NationWideRating.update({
            where: {
                id: +itm.id
            },
            data: {
                trust: itm.trust,
                joy: itm.joy,
                surprise: itm.surprise,
                anticipation: itm.anticipation,
                sadness: itm.sadness,
                fear: itm.fear,
                anger: itm.anger,
                disgust: itm.disgust,
                rate: itm.rate,
                text: itm.text
            }
        })
    }
    // await client.v3NationWideRating.updateMany({
    //     where: {
    //         date: new Date(body[0].date)
    //     },
    //     data: body.map((v) => ({
    //         trust: v.trust,
    //         joy: v.joy,
    //         surprise: v.surprise,
    //         anticipation: v.anticipation,
    //         sadness: v.sadness,
    //         fear: v.fear,
    //         anger: v.anger,
    //         disgust: v.disgust,
    //         rate: v.rate,
    //         text: v.text
    //     }))
    // })

    return res.status(201).end()
}