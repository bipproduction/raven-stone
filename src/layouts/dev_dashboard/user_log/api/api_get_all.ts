
import client from "@/lib/prisma_db"
import _ from "lodash"


export async function apiUserLogGetAll(req: any, res: any) {
    const result = await client.userLog.findMany({
        select: {
            id: true,
            title: true,
            detail: true,
            date: true,
            User: {
                select: {
                    id: true,
                    name: true
                }
            }
        }
    })

    const result2 = result.map((item) => ({
        ..._.omit(item, ["User"]),
        userId: item.User?.id,
        userName: item.User?.name
    }))

    res.status(200).json(result2)
}

