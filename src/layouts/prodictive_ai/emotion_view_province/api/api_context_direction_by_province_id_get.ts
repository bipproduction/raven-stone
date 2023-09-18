import client from "@/lib/prisma_db"
import _ from "lodash";

export async function api_context_direction_by_province_id_get(req: any, res: any) {
    const { provinceId } = req.query
    if (!provinceId) return res.status(400).json({ message: "provinceId tidak boleh kosong" })
    const data = await client.city.findMany({
        where: {
            provinceId: Number(provinceId)
        },
        select: {
            CityContextDirection: {
                select: {
                    content: true
                }
            }
        }
    })

    const hasil = []
    for (let itm of data) {
        const d: any = itm.CityContextDirection[0] ? itm.CityContextDirection[0].content : null
        if (d) {
            hasil.push(d)
        }
    }
    // console.log(hasil);

    const count = await client.city.count({
        where: {
            provinceId: +provinceId
        }
    })

    // const mergedResult = data.reduce((result: any, item) => {
    //     try {
    //         const content: any = item.CityContextDirection[0].content;
    //         content.forEach((element: any) => {
    //             const existingItem: any = result.find((el: any) => el.name === element.name);
    //             if (existingItem) {
    //                 existingItem.value += element.value;
    //             } else {
    //                 result.push({ name: element.name, value: element.value });
    //             }
    //         });
    //     } catch (error) {

    //     }
    //     return result;
    // }, []);


    let maka = {};
    if (!_.isEmpty(hasil)) {
        const flattenedData = _.flatten(hasil);
        const totals = _.reduce(flattenedData, (result: any, item: any) => {
            if (result[item.name]) {
                result[item.name] += item.value;
            } else {
                result[item.name] = item.value;
            }

            //console.log(result)
            return result;
        }, {});

        // const totalValues = _.sum(_.values(totals));

        const avg = _.mapValues(totals, (value) => {
            //return (value / (count * 100)) * 100;
            return value / count;
        });

        maka = _.keys(avg).map((v) => ({
            name: v,
            value: avg[v].toFixed(0)
        }))
    }



    return res.status(200).json(maka)
}