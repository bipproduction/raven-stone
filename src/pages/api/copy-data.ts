import moment from 'moment';
import client from '@/lib/prisma_db';
import { NextApiRequest, NextApiResponse } from 'next';
import _ from 'lodash';
const copyData = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "POST") {
        const body = req.body

        if (body.typeAction == "all") {
            const dataNya = await client.dataByContent.findMany({
                where: {
                    date: new Date(body.dateFrom as any),
                }
            })

            await client.dataByContent.deleteMany({
                where: {
                    date: new Date(body.dateTo as any)
                }
            })

            const data = dataNya.map((v) => ({
                ..._.omit(v, ['id']),
                date: new Date(body.dateTo as any)
            }))

            // console.log(bahan)


            await client.dataByContent.createMany({ data })

            return res.status(201).json({
                success: true
            })
        } else if (body.typeAction == "selected") {
            const dataNya = await client.dataByContent.findMany({
                where: {
                    date: new Date(body.dateFrom as any),
                    candidateId: Number(body.selectedCandidate)
                }
            })

            await client.dataByContent.deleteMany({
                where: {
                    date: new Date(body.dateTo as any),
                    candidateId: Number(body.selectedCandidate)
                }
            })

            const data = dataNya.map((v) => ({
                ..._.omit(v, ['id']),
                date: new Date(body.dateTo as any)
            }))

            await client.dataByContent.createMany({ data })

            return res.status(201).json({
                success: true
            })
        } else if (body.typeAction == "one_for_all") {
            const dataNya = await client.dataByContent.findMany({
                where: {
                    date: new Date(body.dateFrom as any),
                    candidateId: Number(body.selectedCandidate)
                }
            })

            await client.dataByContent.deleteMany({
                where: {
                    date: new Date(body.dateTo as any)
                }
            })

            const allCandidate = await client.candidate.findMany()

            for (let itm of allCandidate) {
                const data = dataNya.map((v) => ({
                    ..._.omit(v, ['id']),
                    date: new Date(body.dateTo as any),
                    candidateId: Number(itm.id)
                }))
                await client.dataByContent.createMany({ data })
                console.log(`insert candidate ${itm.name}`)
            }

            return res.status(201).json({
                success: true
            })

        }


        const dataNya = await client.dataByContent.findMany({
            where: {
                date: new Date(body.dateFrom as any),
                candidateId: Number(body.selectedCandidate)
            }
        })

        await client.dataByContent.deleteMany({
            where: {
                date: new Date(body.dateTo as any),
                candidateId: Number(body.selectedCandidateOther)
            }
        })

        const data = dataNya.map((v) => ({
            ..._.omit(v, ['id']),
            date: new Date(body.dateTo as any),
            candidateId: Number(body.selectedCandidateOther)
        }))

        await client.dataByContent.createMany({ data })

        return res.status(201).json({
            success: true
        })

        // const { from, to, candidateId } = req.query
        // const data = await client.dataByContent.findMany({
        //     where: {
        //         date: new Date(from as any)
        //     }
        // })

        // const hasil = candidateId == "" ? data.map((v) => ({
        //     ..._.omit(v, ['id']),
        //     date: new Date(to as any)
        // })) : data.filter((v) => v.candidateId == Number(candidateId)).map((v) => ({
        //     ..._.omit(v, ['id']),
        //     date: new Date(to as any)
        // }))

        // await client.dataByContent.deleteMany({
        //     where: {
        //         date: new Date(to as any)
        //     }
        // })

        // await client.dataByContent.createMany({ data: hasil })

        // // console.log(hasil)

        // res.status(201).json({ success: true })
    }
}

export default copyData