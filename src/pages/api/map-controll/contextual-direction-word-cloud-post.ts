import client from '@/lib/prisma_db';
import { NextApiRequest, NextApiResponse } from 'next';
const contextualDirectionWordCloudPost = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "POST") {
        const body = req.body

        await client.cityWordCloud.upsert({
            where: {
                cityId: Number(body.cityId)
            },
            create: {
                cityId: Number(body.cityId),
                data: {
                    "content": body.data
                }
            },
            update: {
                data: {
                    "content": body.data
                }
            }
        })

        res.status(201).end()
    }
}

export default contextualDirectionWordCloudPost