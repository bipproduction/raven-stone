import client from "@/lib/prisma_db";
import _ from "lodash";

export async function api_v3_nation_wide_rating_chart_data_get(req: any, res: any) {
    const { candidate1Id, candidate2Id, start, end } = req.query

    console.log(candidate1Id, candidate2Id, start, end)
    if (!candidate1Id || !candidate2Id || !start || !end) {
        return res.status(400).json({ message: "Bad Request" })
    }
    const data = await client.v3NationWideRating.findMany({
        where: {
            candidate1Id: +candidate1Id,
            candidate2Id: +candidate2Id,
            date: {
                lte: new Date(end),
                gte: new Date(start)
            }
        },
        select: {
            trust: true,
            joy: true,
            surprise: true,
            anticipation: true,
            sadness: true,
            fear: true,
            anger: true,
            disgust: true,
            date: true
        }
    })

    if (_.isEmpty(data)) {
        return res.status(404).end()
    }

    // const result = _.reduce(data, (acc: any, obj: any) => {
    //     _.forEach(obj, (value, key) => {
    //         acc[key] = (acc[key] || 0) + parseInt(value);
    //     });
    //     return acc;
    // }, {});

    // const max = _.sum(_.values(result))
    // const resul2 = {
    //     trust: _.round((result["trust"] / max) * 100, 2),
    //     joy: _.round((result["joy"] / max) * 100, 2),
    //     surprise: _.round((result["surprise"] / max) * 100, 2),
    //     anticipation: _.round((result["anticipation"] / max) * 100, 2),
    //     sadness: _.round((result["sadness"] / max) * 100, 2),
    //     fear: _.round((result["fear"] / max) * 100, 2),
    //     anger: _.round((result["anger"] / max) * 100, 2),
    //     disgust: _.round((result["disgust"] / max) * 100, 2),
    // }


    return res.status(200).json(data)
}