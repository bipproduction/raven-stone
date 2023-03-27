import prompts, { PromptObject } from 'prompts'
import { execSync } from 'child_process'
function pull() {

    const url = "https://eagle-eye-c93d5-default-rtdb.asia-southeast1.firebasedatabase.app/eagle_2/.json"

    execSync(`
    curl -X PATCH -d '{"update": true}'  ${url} &&
    git pull origin dev --merge &&
    pm2 restart 16 &&
    pm2 save &&
    curl -X PATCH -d '{"update": false}'  ${url}
    `, { stdio: "inherit" })
}

const listMenu = [
    {
        title: "pull",
        value: "pull",
        act: pull
    }
]

const main = async () => {
    prompts({
        type: "select",
        message: "pilih menunya",
        choices: listMenu,
        name: "apa"
    }).then(({ apa }) => {
        if (apa) listMenu.find((v) => v.value == apa)?.act()
    })
}

main()
export { }