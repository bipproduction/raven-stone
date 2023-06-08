import client from "@/lib/prisma_db"

export async function api_user_user_role_get(req: any, res: any) {
    const data = await client.userRole.findMany({
        select: {
            id: true,
            name: true,
            isActive: true,
        }
    })
    return res.status(200).json(data)
}