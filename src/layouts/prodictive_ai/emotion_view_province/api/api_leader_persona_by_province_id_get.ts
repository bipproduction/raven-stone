import client from "@/lib/prisma_db";
import _ from "lodash";

export async function api_leader_persona_by_province_id_get(req: any, res: any) {
  const { provinceId } = req.query
  if (!provinceId) return res.status(400).json({ message: "provinceId tidak boleh kosong" })
  const data = await client.city.findMany({
    where: {
      provinceId: Number(provinceId)
    },
    select: {
      CityLeaderPersonaPrediction: {
        select: {
          data: true
        }
      }
    }
  })

  const hasil = []
  for (let itm of data) {
    const d: any = itm.CityLeaderPersonaPrediction[0] ? itm.CityLeaderPersonaPrediction[0].data : null
    if (d) {
      hasil.push(d.content)
    }
  }

  let maka = {};
  if (!_.isEmpty(hasil)) {
    const flattenedData = _.flatten(hasil);
    const totals = _.reduce(flattenedData, (result: any, item: any) => {
      if (result[item.title]) {
        result[item.title] += item.value;
      } else {
        result[item.title] = item.value;
      }

      console.log(result)
      return result;
    }, {});

    const totalValues = _.sum(_.values(totals));

    const percentages = _.mapValues(totals, (value) => {
      return _.round((value / totalValues) * 100, 2);
    });

    maka = _.keys(percentages).map((v) => ({
      title: v,
      value: percentages[v]
    }))
  }


  return res.status(200).json(maka)
}