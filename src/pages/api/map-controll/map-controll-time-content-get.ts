import client from "@/lib/prisma_db"
import { NextApiRequest, NextApiResponse } from "next"

const mapControllTimeContentGet = async (req: NextApiRequest, res: NextApiResponse) => {
    const {contentId} = req.query
    const data = await client.dataContentByTime.findUnique({
        where: {
            dataByContentId: Number(contentId)
        }
    })

    res.status(200).json(data)
}

export default mapControllTimeContentGet