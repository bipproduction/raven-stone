var CronJob = require('cron').CronJob;
const { copy_data } = require("./copy_data")

var job = new CronJob(
    '01 00 * * *',
    async () => {
        await copy_data()
    },
    null,
    true
);

job.start();
console.log("start cron job", job.running);