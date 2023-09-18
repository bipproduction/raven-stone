import client from "@/lib/prisma_db";
import _ from "lodash";
import { NextApiRequest, NextApiResponse } from "next";
import Papa from "papaparse";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const resData = await client.nationWideRatingV2.findUnique({
        where: {
            id: 1
        }
    })

    const data: any[] = resData?.data as []

    return res
        .status(200)
        .setHeader("Content-Type", "text/csv")
        .setHeader("Content-Disposition", `attachment; filename=nation-wide-rating.csv`)
        .send(Papa.unparse(data.map((v) => ({
            id: v.id,
            candidate_1_id: v.candidate_1_id,
            candidate_2_id: v.candidate_2_id,
            candidate_1_name: v.candidate_1_name,
            candidate_2_name: v.candidate_2_name,
            trust: v.trust,
            joy: v.joy,
            surprise: v.surprise,
            anticipation: v.anticipation,
            sadness: v.sadness,
            fear: v.fear,
            anger: v.anger,
            disgust: v.disgust,
            rate: v.rate,
            text: v.text
        }))));
}