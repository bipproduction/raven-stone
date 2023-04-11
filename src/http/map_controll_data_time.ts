import { api } from "@/lib/api"
import { NextApiRequest, NextApiResponse } from "next"


const get = async ({ contentId }: { contentId: string }) => {
    const res = await fetch(api.apiMapControllMapControllTimeContentGet)
    if (res.status === 200) {
        const data = await res.json()
        return data
    }

    return null
}


export const mapControllDataTime = {}