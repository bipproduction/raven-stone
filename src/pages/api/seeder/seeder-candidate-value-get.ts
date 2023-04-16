import { NextApiRequest, NextApiResponse } from 'next';
import candidate from '../../../../bin/perhitungan/candidate.json'
import city_value from '../../../../bin/perhitungan/city_value.json'

export default async function seederCandidateValue(req: NextApiRequest, res: NextApiResponse) {
    let id = 1;
    let result: any[] = []
    candidate.forEach((item) => {
        city_value.forEach((itm2) => {
            const data = {
                id: id,
                candidateId: item.id,
                cityId: itm2.id,
                value: itm2.value
            }
            id++
            result.push(data)
        })
    })

    res.status(200).json(result)
}