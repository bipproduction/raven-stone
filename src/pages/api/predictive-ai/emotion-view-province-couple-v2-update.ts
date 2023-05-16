import client from "@/lib/prisma_db"

export default async function handler(req: any, res: any) {
    if (req.method !== "POST") return res.status(405).send("Method not allowed")
    const body: any[] = req.body

    for (let itm of body) {
        await client.emotionViewProvinceCoupleV2.update({
            where: {
                id: itm.id
            },
            data: {
                id: itm.id,
                candidate1Id: Number(itm.candidate1Id),
                candidate2Id: Number(itm.candidate2Id),
                cityId: Number(itm.cityId),
                trust: Number(itm.trust),
                joy: Number(itm.joy),
                surprise: Number(itm.surprise),
                anticipation: Number(itm.anticipation),
                sadness: Number(itm.sadness),
                fear: Number(itm.fear),
                anger: Number(itm.anger),
                disgust: Number(itm.disgust),
            }
        })
    }

    res.status(201).end()
}