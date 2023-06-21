// /Users/bip/.nvm/versions/node/v18.16.0/bin/node

const { PrismaClient } = require("@prisma/client")
const client = new PrismaClient()
const _ = require("lodash");
const moment = require("moment");
require("colors")
const fetch = require('node-fetch2')

// 04 15 * * * /Users/bip/Documents/projects/bip/eagle-v2/bin/copy_data.js >> /Users/bip/Documents/projects/bip/eagle-v2/bin/copy_data.log
// /var/mail/bip
// /var/log/system.log
const kemarin = moment().subtract(1, 'days').format('YYYY-MM-DD');
const sekarang = moment().format('YYYY-MM-DD');

async function copy_data() {
    const copyData = await client.dataByContent.findMany({
        where: {
            date: new Date(kemarin)
        }
    })

    console.log("ambil data dataByContent ...")
    const data = copyData.map(item => ({
        ..._.omit(item, ["id"]),
        date: new Date(sekarang)
    }))

    console.log("hapus data tanggal sekarang jika ada ...")
    await client.dataByContent.deleteMany({
        where: {
            date: new Date(sekarang)
        }
    })

    console.log("simpan data Winning Rate ...")
    const dataWinningRate = await client.v3NationWideRating.findMany({
        where: {
            date: new Date(kemarin)
        }
    })

    console.log("hapus data winning rate tanggal sekarang jika ada ...")
    const resultDataWinningrate = dataWinningRate.map(item => ({
        ..._.omit(item, ["id"]),
        date: new Date(sekarang)
    }))

    console.log("hapus data winning rate ...")
    await client.v3NationWideRating.deleteMany({
        where: {
            date: new Date(sekarang)
        }
    })

    console.log("simpan data winning rate ...")
    await client.v3NationWideRating.createMany({ data: resultDataWinningrate })

    console.log("memasukkan data dari tanggal kemarin ke tanggal sekarang!".yellow)
    await client.dataByContent.createMany({ data })

    console.log("SUCCESS!".cyan)
    console.log(moment().format('YYYY-MM-DD'))

    await fetch(`https://wa-server.makurostudio.my.id/kirim?number=6289697338821&text=copy data ${moment().format('YYYY-MM-DD')} completed`).then(() => {
        console.log("kirim ke malik success")
    })

    await fetch(`https://wa-server.makurostudio.my.id/kirim?number=628980185458&text=copy data ${moment().format('YYYY-MM-DD')} completed`).then(() => {
        console.log("kirim ke dwi success")
    })
}


module.exports = { copy_data }