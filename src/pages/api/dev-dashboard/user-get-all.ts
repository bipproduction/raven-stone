import client from "@/lib/prisma_db";

export default async function handler(req: any, res: any) {
    const data = await client.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            password: true,
            phone: true,
            userRoleId: true
        }
    })
    return res.status(200).json(data)
}