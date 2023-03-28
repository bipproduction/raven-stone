import { funcLoadTop10Province } from "@/fun_load/func_load_to_10_province";
import { gListEmotion } from "@/g_state/g_list_emotion";
import { gSelectedEmotion } from "@/g_state/g_selected_emotion";
import { gTop10Province } from "@/g_state/top_10_province/g_top_10_province";
import { gTop10ProvinceTake } from "@/g_state/top_10_province/g_top_10_province_take";
import { api } from "@/lib/api";
import { ModelTop10Province } from "@/model/top_10_province";
import { stylesGradient1 } from "@/styles/styles_gradient_1";
import {
  Group,
  Pagination,
  Paper,
  Select,
  Stack,
  Table,
  Text,
} from "@mantine/core";
import { useForceUpdate, useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { useState } from "react";
import PageTitle from "../page_title";

const Top10ProvinceByConversation = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const update = useForceUpdate();
  if (_.isEmpty(gTop10Province.value)) return <>loading</>;
  return (
    <>
      <Stack>
        <PageTitle text="TOP 10 aktivitas berdasarkan kalkulasi kompleks yang menghasilkan prediksi dari penggabungan proses data mining dan olah data Machine Learning & Artificial Intelligence. var = NLP + FR + Socmed + Internet Behaviours" />
        {/* {JSON.stringify(gTop10ProvinceTake.value)} */}
        <Paper shadow={"sm"} p={"md"} bg={stylesGradient1} sx={{
              overflow: "scroll"
            }}>
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
              onChange={async (val) => {
                if (val) {
                  gSelectedEmotion.set(val);
                  await funcLoadTop10Province();
                  update();
                }
              }}
            />
          </Group>
          <Stack>
            <Table withBorder >
              <thead>
                <tr>
                  {Object.keys(_.omit(gTop10ProvinceTake.value[0], "id")).map(
                    (v, i) => (
                      <th key={i}>
                        <Text c={"cyan.8"} fw={"bold"}>
                          {_.upperCase(v)}
                        </Text>
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {gTop10ProvinceTake.value.map((v, i) => (
                  <tr key={i}>
                    {Object.values(_.omit(v, "id")).map((v2, ii) => (
                      <td key={ii}>
                        {_.isNaN(Number(v2))
                          ? v2
                          : Intl.NumberFormat("id-ID").format(Number(v2))}
                      </td>
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
        </Paper>
      </Stack>
    </>
  );
};

export default Top10ProvinceByConversation;
