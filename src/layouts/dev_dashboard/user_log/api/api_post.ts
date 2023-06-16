import client from "@/lib/prisma_db"

const url = "/api/user_log_post"
const fun = async (req: any, res: any) => {
    if (req.method != "POST") {
        res.status(405).json({ message: "Method not allowed" })
        return
    }

    const { title, detail, userId } = req.body
    const result = await client.userLog.create({
        data: {
            title,
            detail,
            date: new Date(),
            userId: userId
        }
    })

    res.status(201).json(result)
}

export const apiUserLogpost = {
    fun
}