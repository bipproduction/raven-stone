import client from "@/lib/prisma_db";
import _ from "lodash";
import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";

const summaryTimeMachineSebulanGet = async (req: NextApiRequest, res: NextApiResponse) => {
    const { date, candidateId } = req.query
    const listData = await client.dataContentByTime.findMany({
        where: {
            candidateId: Number(candidateId),
            date: {
                gte: new Date(moment(new Date()).subtract(1, 'months').format("YYYY-MM-DD")),
                lte: new Date(moment(new Date()).format("YYYY-MM-DD")),
            }
        },
        orderBy: {
            date: "asc"
        }
    })

    const data = listData.map((v) => ({
        date: moment(v.date).format("YYYY-MM-DD"),
        sentiment: {
            positive: _.sumBy(v.data as any, (o: any) => o.sentiment.positive),
            negative: _.sumBy(v.data as any, (o: any) => o.sentiment.negative),
            neutral: _.sumBy(v.data as any, (o: any) => o.sentiment.neutral)
        }
    })).map((v) => {
        const total = _.sum([v.sentiment.positive, v.sentiment.negative, v.sentiment.neutral])
        return {
            label: v.date,
            sentiment: {
                positive: _.round((v.sentiment.positive / total) * 100),
                negative: _.round((v.sentiment.negative / total) * 100),
                neutral: _.round((v.sentiment.neutral / total) * 100)
            }
        }
    })


    res.status(200).json({ data: data })
}

export default summaryTimeMachineSebulanGet