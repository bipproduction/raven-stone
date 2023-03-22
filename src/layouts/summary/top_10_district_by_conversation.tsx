import { gTop10District } from "@/g_state/top_10_district/g_top_10_district";
import { gTop10DistrictCount } from "@/g_state/top_10_district/g_top_10_district_take";
import { Group, Pagination, Table, Text } from "@mantine/core";
import _ from "lodash";
import { useState } from "react";

const Top10DistrictbyConversation = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);

  if (gTop10District.value && !gTop10District.value[0]) return <></>;

  return (
    <>
      <Text>Top 10 District By Conversation</Text>
      <Table striped withBorder highlightOnHover>
        <thead>
          <tr>
            {Object.keys(gTop10DistrictCount.value[0]).map((v) => (
              <th key={v}>
                <Text fw={"bold"}>{_.upperCase(v)}</Text>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {gTop10DistrictCount.value.map((v, i) => (
            <tr key={i}>
              {Object.values(v).map((vv: any, ii) => (
                <td key={ii}>
                  {_.isNaN(Number(vv))
                    ? vv
                    : Intl.NumberFormat("id-ID").format(vv)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>

      <Group position="right" mt={"lg"}>
        <Pagination
          total={Math.floor(gTop10District.value.length / pageSize)}
          value={page}
          onChange={(val) => {
            const start = (val - 1) * pageSize;
            const end = start + pageSize;
            const pageItem = _.slice(gTop10District.value, start, end);
            setPage(val);
            gTop10DistrictCount.set(pageItem);
          }}
        />
      </Group>
    </>
  );
};

export default Top10DistrictbyConversation;
