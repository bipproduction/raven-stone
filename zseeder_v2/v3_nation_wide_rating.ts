import { writeFileSync } from 'fs';
import fs from 'fs';
import client from "@/lib/prisma_db";
import _ from "lodash";
import { execSync } from 'child_process'
import 'colors'
import moment from 'moment';

async function main() {
    const candidate1 = await client.candidate.findMany()
    const candidate2 = await client.candidate.findMany()
    const city = await client.city.findMany()

    // await client.v3NationWideRating.deleteMany({
    //     where: {
    //         id: {
    //             gte: 0
    //         }
    //     }
    // })

    const listResult = []
    const date = ["2023-05-19", "2023-05-20", "2023-05-21", "2023-05-22", "2023-05-23", "2023-05-24", "2023-05-25"]

    let id = 1
    for (let c1 of candidate1) {
        for (let c2 of candidate2) {
            if (c1.id != c2.id) {
                for (let d of date) {
                    const data = {
                        id: id,
                        candidate1Id: c1.id,
                        candidate2Id: c2.id,
                        text: `text`,
                        rate: `${_.random(1, 100)}`,
                        trust: _.random(1, 100).toString(),
                        joy: _.random(1, 100).toString(),
                        surprise: _.random(1, 100).toString(),
                        anticipation: _.random(1, 100).toString(),
                        sadness: _.random(1, 100).toString(),
                        fear: _.random(1, 100).toString(),
                        anger: _.random(1, 100).toString(),
                        disgust: _.random(1, 100).toString(),
                        date: moment(d).format('YYYY-MM-DD')
                    }

                    listResult.push(data)
                    id++;
                }
            }
        }
    }

    let sql = 'TRUNCATE TABLE `V3NationWideRating`;  INSERT INTO V3NationWideRating (id, candidate1Id, candidate2Id, text, rate, trust, joy, surprise, anticipation, sadness, fear, anger, disgust, date) VALUES ';

    listResult.forEach((item, index) => {
        sql += `(${item.id}, ${item.candidate1Id}, ${item.candidate2Id}, '${item.text.replace(/'/g, "''")}', '${item.rate}', '${item.trust}', '${item.joy}', '${item.surprise}', '${item.anticipation}', '${item.sadness}', '${item.fear}', '${item.anger}', '${item.disgust}', '${item.date}')`;

        // Add a comma after each item except the last one
        if (index !== listResult.length - 1) {
            sql += ', ';
        }
    });

    fs.writeFileSync(__dirname + '/v3_nation_wide_rating.sql', sql);
    console.log("success".green)
}

main()