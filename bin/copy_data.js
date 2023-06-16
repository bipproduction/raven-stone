// /Users/bip/.nvm/versions/node/v18.16.0/bin/node
var CronJob = require('cron').CronJob;
const { PrismaClient } = require("@prisma/client")
const client = new PrismaClient()
const _ = require("lodash");
const moment = require("moment");
require("colors")

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

    console.log("ambil data ...")
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

    console.log("memasukkan data dari tanggal kemarin ke tanggal sekarang!".yellow)
    await client.dataByContent.createMany({ data })
    console.log("SUCCESS!".cyan)
    console.log(moment().format('YYYY-MM-DD'))
}

var job = new CronJob(
    '1 0 * * *',
    function () {
        copy_data()
    },
    null,
    true
);

job.start();