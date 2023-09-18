const moment = require('moment')
const fetch = require('node-fetch2')

fetch(`https://wa-server.makurostudio.my.id/kirim?number=628980185458&text=copy data ${moment().format('YYYY-MM-DD')} completed`).then(() => {
    console.log("kirim ke dwi success")
})


