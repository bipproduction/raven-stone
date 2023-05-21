import client from "@/lib/prisma_db"

export async function api_map_controll_copy_data_check_count(req: any, res: any) {
    const { date } = req.query
    const data = await client.dataByContent.findFirst({
        where: {
            date: new Date(date)
        }
    })

    res.status(200).json(data)
}