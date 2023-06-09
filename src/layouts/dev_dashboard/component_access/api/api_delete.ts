import client from "@/lib/prisma_db"

export async function api_component_access_delete(req: any, res: any) {
    if (req.method != 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    const data = req.body
    await client.componentAccess.delete({
        where: {
            id: data.id
        }
    })

    return res.status(201).json({ success: true })
}