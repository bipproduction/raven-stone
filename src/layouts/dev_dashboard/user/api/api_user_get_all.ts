export const api_user_get_all = async (req: any, res: any) => {
    const client = (await import("@/lib/prisma_db")).default
    const data = await client.user.findMany({
        where: {
            isActive: true
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: true,
            phone: true,
            userRoleId: true,
            isActive: true
        }
    })

    return res.status(200).json(data)
}
