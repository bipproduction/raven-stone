// import client from "@/lib/prisma_db"

export async function api_user_role_edit(req: any, res: any) {
    const client = (await import("@/lib/prisma_db")).default
    
    if (req.method != 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    const body = req.body
    const data = await client.userRole.update({
        where: {
            id: body.id
        },
        data: body
    })

    res.status(201).json(data)
}