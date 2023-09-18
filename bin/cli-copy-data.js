const { copy_data } = require('./copy_data');

require('colors')
const argv = require('yargs')
    .version("1.0.0".green)
    .option("now", {
        alias: "n",
        demandOption: true,
        description: "sekarang".green,
        type: "boolean"
    })
    .help()
    .alias("help", "h")
    .argv;

if (argv.now) {
    copy_data()
}