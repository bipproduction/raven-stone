import prompts, { PromptObject } from 'prompts'
import { execSync } from 'child_process'
function pull() {

    const url = "https://eagle-eye-c93d5-default-rtdb.asia-southeast1.firebasedatabase.app/eagle_2/.json"
    const urlForceReload = "https://eagle-eye-c93d5-default-rtdb.asia-southeast1.firebasedatabase.app/eagle_2/force_reload.json"
    execSync(`
    curl -X PATCH -d '{"update": true}'  ${url}
    git pull origin dev --autostash
    yarn
    yarn build
    pm2 restart 16
    pm2 save
    curl -X PATCH -d '{"update": false}'  ${url}
    sleep 6
    curl -X PATCH -d '{"value": ${Math.random()} }'  ${urlForceReload}
    `, { stdio: "inherit" })
}

// echo apa
// sleep 4
// echo iya

function push() {
    const branchName = execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
    execSync(`
    git add -A
    git commit -m "auto commit"
    git push origin ${branchName}
    `, { stdio: "inherit" })
}

const listMenu = [
    {
        title: "pull",
        value: "pull",
        act: pull
    },
    {
        title: "push",
        value: "push",
        act: push
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


import Papa from 'papaparse'
import client from '@/lib/prisma_db'
import fs from 'fs'
import _ from 'lodash'
async function main2() {

    const date = "2023-03-16"
    const candidate = await client.candidate.findMany()
    const hasil: any = {}
    for (let itm of candidate) {
        const data = await client.dataByContent.findMany({
            where: {
                date: new Date(date),
                candidateId: itm.id
            },
            select: {
                id: true,
                date: true,
                candidateId: true,
                provinceId: true,
                cityId: true,
                anger: true,
                disgust: true,
                fear: true,
                joy: true,
                sadness: true,
                surprise: true,
                trust: true,
                anticipation: true,
            }
        })

        const name = itm.name ?? ""
        hasil[`${_.camelCase(name)}_${date}`] = Papa.unparse(data)
    }



}

async function main3() {
    const candidate = await client.candidate.findMany()
    const candidate1 = candidate
    const candidate2 = candidate

    const listHasil = []
    for (let i in candidate1) {
        for (let j in candidate2) {
            if (candidate1[i].name != candidate2[j].name) {
                const data = {
                    candidate1Id: candidate1[i].id,
                    candidate2Id: candidate2[j].id,
                    trust: 0,
                    joy: 0,
                    surprise: 0,
                    anticipation: 0,
                    sadness: 0,
                    fear: 0,
                    anger: 0,
                    disgust: 0,
                    rate: 0,
                    text: "text"
                }
                listHasil.push(data)
            }
        }
    }

    console.table(listHasil)
}

main3()