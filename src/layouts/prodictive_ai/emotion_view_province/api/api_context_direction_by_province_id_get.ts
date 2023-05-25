import client from "@/lib/prisma_db"

export async function api_context_direction_by_province_id_get(req: any, res: any) {
    const { provinceId } = req.query
    if (!provinceId) return res.status(400).json({ message: "provinceId tidak boleh kosong" })
    const data = await client.city.findMany({
        where: {
            provinceId: Number(provinceId)
        },
        select: {
            CityContextDirection: {
                select: {
                    content: true
                }
            }
        }
    })

    const mergedResult = data.reduce((result: any, item) => {
        try {
            const content: any = item.CityContextDirection[0].content;
            content.forEach((element: any) => {
                const existingItem: any = result.find((el: any) => el.name === element.name);
                if (existingItem) {
                    existingItem.value += element.value;
                } else {
                    result.push({ name: element.name, value: element.value });
                }
            });
        } catch (error) {

        }
        return result;
    }, []);

    return res.status(200).json(mergedResult)
}