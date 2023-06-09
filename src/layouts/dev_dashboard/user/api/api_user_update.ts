// import client from "@/lib/prisma_db"

export async function api_user_update(req: any, res: any) {
    const client = (await import("@/lib/prisma_db")).default
    if (req.method != 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }
    const body = req.body

    // console.log(body)
    // return res.status(201).json(body)
    const data = await client.user.update({
        where: {
            id: body.id
        },
        data: body
    })

    return res.status(201).json(data)
}