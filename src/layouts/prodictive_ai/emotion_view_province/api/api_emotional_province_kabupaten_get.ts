import client from "@/lib/prisma_db"

export async function api_emotional_province_kabupaten_get(req: any, res: any) {
    const { provinceId, date, candidateId } = req.query
    if (!provinceId || !date || !candidateId) return res.status(400).json({ message: "provinceId tidak boleh kosong" })

    const data = await client.dataByContent.findMany({
        where: {
            provinceId: Number(provinceId),
            date: new Date(date),
            candidateId: Number(candidateId)
        },
        select: {
            trust: true,
            joy: true,
            surprise: true,
            anticipation: true,
            sadness: true,
            fear: true,
            anger: true,
            disgust: true,

            City: {
                select: {
                    id: true,
                    name: true,
                    CityContextDirection: {
                        select: {
                            content: true
                        }
                    },
                    CityLeaderPersonaPrediction: {
                        select: {
                            data: true
                        }
                    },
                    CityValue: {
                        select: {
                            value: true
                        }
                    }
                },

            }
        }
    })
    return res.status(200).json(data)
}