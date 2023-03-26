import client from '@/lib/prisma_db';
import { NextApiRequest } from 'next';
import { NextApiResponse } from 'next';
const injectData = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const body = req.body

        for (let itm of body) {
            const dataNya = {
                "id": Number(itm.id),
                "candidateId": Number(itm.candidateId),
                "provinceId": Number(itm.provinceId),
                "cityId": Number(itm.cityId),
                "trust": Number(itm.trust),
                "joy": Number(itm.joy),
                "surprise": Number(itm.surprise),
                "anticipation": Number(itm.anticipation),
                "sadness": Number(itm.sadness),
                "fear": Number(itm.fear),
                "anger": Number(itm.anger),
                "disgust": Number(itm.disgust),
                "date": new Date(itm.date)
            }
            await client.dataByContent.upsert({
                where: {
                    id: dataNya.id
                },
                update: dataNya,
                create: dataNya
            })

            console.log(`update ${itm.id}`)
        }
        console.log("update success")
        res.status(201).json(body)
    }
}

export default injectData