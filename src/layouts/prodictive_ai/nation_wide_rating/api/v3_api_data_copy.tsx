import client from "@/lib/prisma_db";
import _ from "lodash";

export async function v3_api_data_copy(req: any, res: any) {
  const { from, to } = req.query;
  if (!from || !to) return res.status(400).end();
  const data = await client.v3NationWideRating.findMany({
    where: {
      date: new Date(from),
    },
  });

  await client.v3NationWideRating.deleteMany({
    where: {
      date: new Date(to),
    },
  });

  await client.v3NationWideRating.createMany({
    data: data.map((v) => ({
      ..._.omit(v, ["id", "createdAt", "updatedAt"]),
      date: new Date(to),
    })),
  });

  return res.status(201).end();
}
