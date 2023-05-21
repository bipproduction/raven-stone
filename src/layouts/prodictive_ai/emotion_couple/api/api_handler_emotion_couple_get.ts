import client from "@/lib/prisma_db";
import _ from "lodash";

export async function _api_handler_emotion_couple_get(req: any, res: any) {
    const { candidate1, candidate2, search, page } = req.query

    if (!candidate1 || !candidate2) return res.status(400).send("Bad request")

    const data = await client.emotionViewProvinceCoupleV2.findMany({
        where: {
            candidate1Id: Number(candidate1),
            candidate2Id: Number(candidate2),
            Province: {
                name: {
                    contains: search
                }
            }
        },
        take: Number(page) * 10,
        select: {
            id: true,
            candidate1Id: true,
            candidate2Id: true,
            Province: {
                select: {
                    id: true,
                    name: true,
                    City: {
                        select: {
                            CityValue: {
                                select: {
                                    value: true
                                }
                            }
                        }
                    }
                }
            },
            trust: true,
            joy: true,
            surprise: true,
            anticipation: true,
            sadness: true,
            fear: true,
            anger: true,
            disgust: true,
        }
    });

    const count = await client.emotionViewProvinceCoupleV2.count({
        where: {
            candidate1Id: Number(candidate1),
            candidate2Id: Number(candidate2),
            Province: {
                name: {
                    contains: search
                }
            }
        }
    })

    res.status(200).json({
        count,
        data: data.map((v) => ({
            ..._.omit(v, ["Province"]),
            provinceId: v.Province!.id,
            provinceName: v.Province!.name,
            value: v.Province?.City.map((v) => v.CityValue.map((v2) => v2.value))
        }))
    });
}