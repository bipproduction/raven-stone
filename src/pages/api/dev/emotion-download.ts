import client from '@/lib/prisma_db';
import _ from 'lodash';
import moment from 'moment';
import { NextApiRequest, NextApiResponse } from 'next';
import PAPA from 'papaparse';
export default async function downloadContent(req: NextApiRequest, res: NextApiResponse) {
    const { date, candidateId, type } = req.query
    if (!date || !candidateId || !type) return res.status(400).end()
    const candidate = await client.candidate.findUnique({
        where: {
            id: +candidateId!
        }
    })

    // http://localhost:3000/api/dev/download-content?date=2023-03-16&candidatId=1

    if (!candidate) return res.status(400).end()

    if (type == "update") {
        const data = await client.dataByContent.findMany({
            where: {
                date: new Date("" + date),
                candidateId: +candidateId!
            },
            select: {
                id: true,
                // date: true,
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
                City: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return res
            .status(200)
            .setHeader("Content-Type", "text/csv")
            .setHeader("Content-Disposition", `attachment; filename=update_${_.kebabCase(candidate.name!)}__${candidate.id}_${date}.csv`)
            .send(PAPA.unparse(data.map(v => ({
                city_name: v.City!.name,
                ..._.omit(v, "City"),

            }))));
    } else if (type == "insert") {
        const data = await client.dataByContent.findMany({
            where: {
                date: new Date("" + date),
                candidateId: +candidateId!
            },
            select: {
                // id: true,
                // date: true,
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
                City: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return res
            .status(200)
            .setHeader("Content-Type", "text/csv")
            .setHeader("Content-Disposition", `attachment; filename=insert_${_.kebabCase(candidate.name!)}__${candidate.id}_${date}.csv`)
            .send(PAPA.unparse(data.map(v => ({
                city_name: v.City!.name,
                ..._.omit(v, "City"),

            }))));
    }

    return res.status(400).end()
}