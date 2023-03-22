import { gTop10Province } from "@/g_state/top_10_province/g_top_10_province";
import { gTop10ProvinceTake } from "@/g_state/top_10_province/g_top_10_province_take";
import { api } from "@/lib/api";
import { ModelTop10Province } from "@/model/top_10_province";
import { Group, Pagination, Stack, Table, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { useState } from "react";

const Top10ProvinceByConversation = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  if (_.isEmpty(gTop10Province.value)) return <>loading</>;
  return (
    <>
      <Stack>
        <Text>Top 10 Province by Conversation</Text>
        {/* {JSON.stringify(gTop10ProvinceTake.value)} */}
        <Table>
          <thead>
            <tr>
              {Object.keys(_.omit(gTop10ProvinceTake.value[0], "id")).map(
                (v, i) => (
                  <th key={i}>
                    <Text fw={"bold"}>{_.upperCase(v)}</Text>
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {gTop10ProvinceTake.value.map((v, i) => (
              <tr key={i}>
                {Object.values(_.omit(v, "id")).map((v2, ii) => (
                  <td key={ii}>{v2}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
        <Group position="right">
          <Pagination
            total={Math.ceil(gTop10Province.value.length / pageSize)}
            value={page}
            onChange={(val) => {
              const start = (val - 1) * pageSize;
              const end = start + pageSize;
              const pageItem = _.slice(gTop10Province.value, start, end);
              setPage(val);
              gTop10ProvinceTake.set(pageItem);
            }}
          />
        </Group>
      </Stack>
    </>
  );
};

export default Top10ProvinceByConversation;
