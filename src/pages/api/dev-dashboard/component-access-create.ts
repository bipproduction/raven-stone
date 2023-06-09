import client from "@/lib/prisma_db"

export default async function handler(req: any, res: any) {
    if (req.method != 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    const data = req.body

    const so = await client.componentAccess.create({ data })

    return res.status(201).json(so)

}