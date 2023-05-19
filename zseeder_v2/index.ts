import { execSync } from 'child_process';
import fs from 'fs'
import prompts from 'prompts'

async function main() {
    const files = [...fs.readdirSync(__dirname)].filter((f) => !f.includes("index") && f.endsWith(".ts"));
    prompts({
        type: "autocomplete",
        name: "pilihan",
        message: "pilih file",
        choices: files.map((v, i) => ({
            title: v,
            value: v
        })),
    }).then(({ pilihan }) => {
        if(!pilihan) return process.exit(1)
        execSync(`tsx ${__dirname}/${pilihan}`, { stdio: 'inherit' })
    })

}

main()

export { }