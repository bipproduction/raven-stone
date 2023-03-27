import { funcLoadTop10District } from "@/fun_load/func_load_top_10_district";
import { gListEmotion } from "@/g_state/g_list_emotion";
import { gSelectedEmotion } from "@/g_state/g_selected_emotion";
import { gTop10District } from "@/g_state/top_10_district/g_top_10_district";
import { gTop10DistrictCount } from "@/g_state/top_10_district/g_top_10_district_take";
import {
  Group,
  Pagination,
  Paper,
  Select,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { useForceUpdate } from "@mantine/hooks";
import _ from "lodash";
import { useState } from "react";
import PageTitle from "../page_title";

const Top10DistrictbyConversation = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const update = useForceUpdate()

  if (gTop10District.value && !gTop10District.value[0]) return <></>;

  return (
    <>
      {/* <Text>Top 10 District By Conversation</Text> */}
      <PageTitle text="TOP 10 aktivitas berdasarkan kalkulasi kompleks yang menghasilkan prediksi dari penggabungan proses data mining dan olah data Machine Learning & Artificial Intelligence. var = NLP + FR + Socmed + Internet Behaviours" />
      <Paper p={"md"}>
        <Group position="right" py={"lg"}>
          <Select
            placeholder={gSelectedEmotion.value}
            variant={"filled"}
            searchable
            label={"sort emotion"}
            data={gListEmotion.value.map((v) => ({
              label: v.name,
              value: v.name,
            }))}
            onChange={async(val) => {
              if (val) {
                gSelectedEmotion.set(val);
                await funcLoadTop10District();
                update()
              }
            }}
          />
        </Group>
        <Stack>
          <Table striped withBorder highlightOnHover>
            <thead>
              <tr>
                {Object.keys(gTop10DistrictCount.value[0]).map((v) => (
                  <th key={v}>
                    <Text c={"cyan.8"} fw={"bold"}>
                      {_.upperCase(v)}
                    </Text>
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
        </Stack>
      </Paper>
    </>
  );
};

export default Top10DistrictbyConversation;
