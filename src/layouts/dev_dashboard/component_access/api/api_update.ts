import client from "@/lib/prisma_db"

export async function api_component_access_update(req: any, res: any) {
    if (req.method != 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    const data = req.body

    // console.log(data)
    const so = await client.componentAccess.update({
        where: {
            id: data.id
        },
        data
    })

    res.status(201).json(so)
}