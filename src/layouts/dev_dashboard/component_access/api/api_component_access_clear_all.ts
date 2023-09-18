export async function api_component_access_clear_all(req: any, res: any) {
    const client = (await import("@/lib/prisma_db")).default
    if (req.method != 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }
    const data = await client.componentAccess.deleteMany({
        where: {
            id: {
                gte: 0
            }
        }
    })
    return res.status(201).json(data)
}