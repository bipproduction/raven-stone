import client from "@/lib/prisma_db";
import _ from "lodash";

export async function v3_api_data_replace(req: any, res: any) {
    if (req.method != "POST") {
        return res.status(400).end()
    }

    const body: any[] = req.body
    const { date } = req.query

    if (!body || !date) {
        return res.status(400).end()
    }

    await client.v3NationWideRating.deleteMany({
        where: {
            date: new Date(date),
        },
    });

    const data = body.map((v) => ({
        ..._.omit(v, ["id","candidate1Id", "candidate2Id", "date", "createdAt", "updatedAt", "candidate1Name", "candidate2Name"]),
        candidate1Id: +v.candidate1Id,
        candidate2Id: +v.candidate2Id,
        date: new Date(date),

    }))

    for (let itm of data) {
        await client.v3NationWideRating.create({
            data: itm as any
        })
    }




    res.status(201).end()

}