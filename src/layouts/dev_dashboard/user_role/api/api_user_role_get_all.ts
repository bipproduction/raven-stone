export async function api_user_role_get_all(req: any, res: any){
    const client = (await import("@/lib/prisma_db")).default
    const data = await client.userRole.findMany({
        where: {
            isActive: true
        },
        select: {
            id: true,
            name: true,
            isActive: true,
        }
    })
    return res.status(200).json(data)
}