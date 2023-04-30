import client from "@/lib/prisma_db";
import _ from "lodash";
import moment from "moment";
import { NextApiRequest, NextApiResponse } from "next";

export default async function summaryTrenSentiment(req: NextApiRequest, res: NextApiResponse) {
    const { start, end, candidateId } = req.query
    
    if (!start || !end || !candidateId) return res.status(403).end()

    const data = await client.dataByContent.findMany({
        where: {
            date: {
                gte: new Date(moment(start).format("YYYY-MM-DD")),
                lte: new Date(moment(end).format("YYYY-MM-DD")),
            },
            candidateId: Number(candidateId)
        },
        orderBy: {
            date: "asc"
        },
        select: {
            date: true,
            trust: true,
            joy: true,
            surprise: true,
            anticipation: true,
            sadness: true,
            fear: true,
            anger: true,
            disgust: true
        }
    });

    const groupedData = _.groupBy(data, (d: any) => d.date.toDateString());

    const result = Object.keys(groupedData).map((dateStr) => {
        const sentimentData = groupedData[dateStr];

        const sum = sentimentData.reduce(
            (acc: any, curr) => ({
                trust: acc.trust + curr.trust,
                joy: acc.joy + curr.joy,
                surprise: acc.surprise + curr.surprise,
                anticipation: acc.anticipation + curr.anticipation,
                sadness: acc.sadness + curr.sadness,
                fear: acc.fear + curr.fear,
                anger: acc.anger + curr.anger,
                disgust: acc.disgust + curr.disgust
            }),
            {
                trust: 0,
                joy: 0,
                surprise: 0,
                anticipation: 0,
                sadness: 0,
                fear: 0,
                anger: 0,
                disgust: 0
            }
        );

        const totalSum = _.sum(Object.values(sum));

        const positive = _.round(((sum.trust + sum.joy + sum.surprise) / totalSum) * 100);
        const neutral = _.round((sum.anticipation / totalSum) * 100);
        const negative = _.round(((sum.sadness + sum.fear + sum.anger + sum.disgust) / totalSum) * 100);

        return {
            date: moment(dateStr).format("YYYY-MM-DD"),
            positive,
            neutral,
            negative
        };
    });

    res.status(200).json(result)
}