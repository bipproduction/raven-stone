import client from "@/lib/prisma_db";

export default async function handler(req: any, res: any) {
    // const data = await client.emotionViewProvinceCoupleV2.findUnique({ where: { id: 1 } });
    res.status(200).json([]);
}