import client from "@/lib/prisma_db"
import _ from "lodash"

export async function api_component_access_get_all(req: any, res: any) {
    const data = await client.componentAccess.findMany({
        select: {
            isActive: true,
            id: true,
            name: true,
            listUserRole: true
        }
    })

    return res.status(200).json(data)
}