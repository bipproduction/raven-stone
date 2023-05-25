import client from "@/lib/prisma_db";

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



  const mergedResult = data.reduce((result: any, item) => {
   

    try {
      const content: any = item.CityLeaderPersonaPrediction[0].data;
      // console.log(content)
      content.content.forEach((element: any) => {
        const existingItem: any = result.find((el: any) => el.title === element.title);
        if (existingItem) {
          existingItem.value += element.value;
        } else {
          result.push({ title: element.title, value: element.value });
        }
      });
    } catch (error) {

    }
    return result;
  }, []);

  // console.log(mergedResult, null, 2)

  return res.status(200).json(mergedResult)
}