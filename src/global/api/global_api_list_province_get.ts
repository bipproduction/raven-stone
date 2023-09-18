import client from "@/lib/prisma_db"

export async function global_api_list_province_get(req: any, res: any) {
    const { provinceId } = req.query
    if (!provinceId) return res.status(400).json({ message: "provinceId tidak boleh kosong" })
    const data = await client.province.findMany({
        where: {
            id: Number(provinceId)
        }
    })

    return res.status(200).json(data)
}