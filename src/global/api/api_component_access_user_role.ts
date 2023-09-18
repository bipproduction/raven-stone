import { api } from "@/lib/api";
import client from "@/lib/prisma_db";

export async function api_global_component_access_user_role(req: any, res: any) {
    const data = await client.componentAccess.findMany({
        where: {
            isActive: true
        },
        select: {
            name: true,
            listUserRole: true
        }
    })
    return res.status(200).json(data)
}