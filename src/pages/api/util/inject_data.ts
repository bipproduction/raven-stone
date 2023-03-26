import client from '@/lib/prisma_db';
import { NextApiRequest } from 'next';
import { NextApiResponse } from 'next';
const injectData = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const body = req.body

        for (let itm of body) {
            const dataNya = {
                id: Number(itm.id),
                anger: Number(itm.anger),
                disgust: Number(itm.disgust),
                fear: Number(itm.fear),
                joy: Number(itm.joy),
                sadness: Number(itm.sadness),
                surprise: Number(itm.surprise),
                trust: Number(itm.trust),
                anticipation: Number(itm.anticipation),
                kabupaten: itm.kabupaten
            }
            await client.dataByContent.upsert({
                where: {
                    id: dataNya.id
                },
                update: dataNya,
                create: dataNya
            })
        }
        res.status(201).json(body)
    }
}

export default injectData