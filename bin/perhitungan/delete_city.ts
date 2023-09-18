import  client  from '@/lib/prisma_db';

client.city.deleteMany({
    where: {
        id: {
            gt: 0
        }
    }
}).then(() => {
    console.log("success")
})

export {}