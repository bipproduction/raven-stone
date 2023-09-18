import client from '@/lib/prisma_db'
import listUser from './../user.json'

export const seederUser = async () => {
    for (let itm of listUser) {
        await client.user.upsert({
            where: {
                id: itm.id.toString()
            },
            create: {
                id: itm.id.toString(),
                name: itm.name,
                email: itm.email,
                password: itm.password,
                userRoleId: itm.userRoleId
            },
            update: {
                name: itm.name,
                email: itm.email,
                password: itm.password,
                userRoleId: itm.userRoleId
            }
        })
    }
    
    console.log("seer user success")

    return true
}