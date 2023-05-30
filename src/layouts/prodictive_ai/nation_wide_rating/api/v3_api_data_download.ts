import Papa from 'papaparse';
import client from "@/lib/prisma_db"
import moment from 'moment';

export async function v3_api_data_download(req: any, res: any){
    const {date} = req.query
    if(!date){
        return res.status(400).json({message: "Bad Request"})
    }

    const data = await client.v3NationWideRating.findMany({
        where: {
            date: new Date(date)
        },
        select: {
            id: true,
            candidate1Id: true,
            candidate2Id: true,
            // date: true,
            trust: true,
            joy: true,
            surprise: true,
            anticipation: true,
            sadness: true,
            fear: true,
            anger: true,
            disgust: true,
            rate: true,
            text: true,
        }
    })

    const candidate = await client.candidate.findMany()

    return res
        .status(200)
        .setHeader("Content-Type", "text/csv")
        .setHeader("Content-Disposition", `attachment; filename=nation-wide-rating_${moment(date).format("YYYY-MM-DD")}.csv`)
        .send(Papa.unparse(data.map((v) => ({
            id: v.id,
            candidate1Id: v.candidate1Id,
            candidate1Name: candidate.find(c => c.id === v.candidate1Id)?.name,
            candidate2Id: v.candidate2Id,
            candidate2Name: candidate.find(c => c.id === v.candidate2Id)?.name,
            // date: moment(v.date).format("YYYY-MM-DD"),
            trust: v.trust,
            joy: v.joy,
            surprise: v.surprise,
            anticipation: v.anticipation,
            sadness: v.sadness,
            fear: v.fear,
            anger: v.anger,
            disgust: v.disgust,
            rate: v.rate,
            text: v.text,
        }))));
    
}