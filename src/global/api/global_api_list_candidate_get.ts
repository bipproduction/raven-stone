import client from "@/lib/prisma_db";

export async function global_api_list_candidate_get(req: any, res: any) {
    const data = await client.candidate.findMany()

    return res.status(200).json(data)

}