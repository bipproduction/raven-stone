import { writeFileSync } from 'fs';
import fs from 'fs';
import client from "@/lib/prisma_db";
import _ from "lodash";
import { execSync } from 'child_process'
import 'colors'

async function main() {
    const candidate1 = await client.candidate.findMany()
    const candidate2 = await client.candidate.findMany()
    const city = await client.city.findMany()

    await client.v3NationWideRating.deleteMany({
        where: {
            id: {
                gte: 0
            }
        }
    })

    const listResult = []

    let id = 1
    for (let c1 of candidate1) {
        for (let c2 of candidate2) {
            if (c1.id != c2.id) {
                for (let ct of city) {
                    const data = {
                        id: id,
                        candidate1Id: c1.id,
                        candidate2Id: c2.id,
                        cityId: ct.id,
                        text: `To create a new array with a specific number of elements using lodash, you can use the times function. This function takes two arguments: the number of iterations and the function that should be executed for each iteration. The function receives the current iteration index and returns the value to be included in the resulting array.`,
                        rate: `${_.random(1, 100)}`,
                        trust: _.random(1, 100).toString(),
                        joy: _.random(1, 100).toString(),
                        surprise: _.random(1, 100).toString(),
                        anticipation: _.random(1, 100).toString(),
                        sadness: _.random(1, 100).toString(),
                        fear: _.random(1, 100).toString(),
                        anger: _.random(1, 100).toString(),
                        disgust: _.random(1, 100).toString(),
                    }

                    listResult.push(data)
                    id++;
                }
            }
        }
    }

    let sql = 'INSERT INTO V3NationWideRating (id, candidate1Id, candidate2Id, cityId, text, rate, trust, joy, surprise, anticipation, sadness, fear, anger, disgust) VALUES ';

    listResult.forEach((item, index) => {
        sql += `(${item.id}, ${item.candidate1Id}, ${item.candidate2Id}, ${item.cityId}, '${item.text.replace(/'/g, "''")}', '${item.rate}', '${item.trust}', '${item.joy}', '${item.surprise}', '${item.anticipation}', '${item.sadness}', '${item.fear}', '${item.anger}', '${item.disgust}')`;

        // Add a comma after each item except the last one
        if (index !== listResult.length - 1) {
            sql += ', ';
        }
    });

    fs.writeFileSync(__dirname + '/v3_nation_wide_rating.sql', sql);
    console.log("success".green)
}

main()