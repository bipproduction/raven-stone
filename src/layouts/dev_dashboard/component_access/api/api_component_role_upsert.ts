import client from "@/lib/prisma_db"
import _ from "lodash"

export async function api_component_role_upsert(req: any, res: any) {
    // if (req.method != 'POST') {
    //     return res.status(405).json({ message: 'Method not allowed' })
    // }

    // const data = req.body
    // const ada = await client.componentRoleAccess.findMany({
    //     where: {
    //         AND: {
    //             userRoleId: data.userRoleId,
    //             componentAccessId: data.componentAccessId
    //         }
    //     }
    // })

    // if (_.isEmpty(data)) {
    //     await client.componentRoleAccess.create({
    //         data
    //     })
    // } else {
    //     await client.componentRoleAccess.update({
    //         where: {
    //             id: ada[0].id
    //         },
    //         data
    //     })
    // }


}