import client from "@/lib/prisma_db";

export default async function handler(req: any, res: any) {
    if (req.method != "POST") {
        return res.status(405).end();
    }

    const body = req.body;
    await client.nationWideRatingV2.update({
        where: {
            id: 1
        },
        data: {
            data: body
        }
    })

    res.status(201).end();
}