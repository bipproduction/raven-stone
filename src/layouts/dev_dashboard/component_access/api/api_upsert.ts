import client from "@/lib/prisma_db"

export async function api_component_access_upsert(req: any, res: any) {
    if (req.method != 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }
    const data = req.body
    await client.componentAccess.upsert({
        where: {
            name: data.name
        },
        update: {
            name: data.name
        },
        create: {
            name: data.name,
            listUserRole: []
        }
    })

    return res.status(201).json({ success: true })
}