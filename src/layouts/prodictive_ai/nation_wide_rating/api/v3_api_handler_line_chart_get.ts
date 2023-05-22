import client from "@/lib/prisma_db"

export async function _api_handler_line_chart_get(req: any, res: any) {
    const { candidate1, candidate2, start, end } = req.query

    const data = await client.v3NationWideRating.findMany({
        where: {
            
        }
    })
}