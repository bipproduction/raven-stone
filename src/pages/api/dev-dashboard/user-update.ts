import client from "@/lib/prisma_db"

export default async function handler(req: any, res: any) {
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