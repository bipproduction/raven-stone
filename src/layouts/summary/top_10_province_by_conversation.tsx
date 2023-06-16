// import { gCandidate } from "@/g_state/g_candidate";
// import { gListEmotion } from "@/g_state/g_list_emotion";
// import { gSelectedCandidate } from "@/g_state/g_map_state";
// import { gSelectedEmotion } from "@/g_state/g_selected_emotion";
// import { gTop10Province } from "@/g_state/top_10_province/g_top_10_province";
// import { gTop10ProvinceTake } from "@/g_state/top_10_province/g_top_10_province_take";
import { sTop10Province } from "@/s_state/s_top_10_province";
import { sTop10ProvinceTake } from "@/s_state/s_top_10_province_take";
import { stylesGradient1 } from "@/styles/styles_gradient_1";
import {
  Button,
  Group,
  Pagination,
  Paper,
  Stack,
  Table,
  Text,
  TextInput,
  Tooltip,
} from "@mantine/core";
import _ from "lodash";
import { useState } from "react";
import PageTitle from "../page_title";
import { MdSearch } from "react-icons/md";
import { sSearchProvince } from "@/s_state/s_search_province";
import { funcLoadTop10Province } from "@/fun_load/func_load_top_10_province";
import { useForceUpdate, useShallowEffect } from "@mantine/hooks";
import { funcLoadTop10District } from "@/fun_load/func_load_top_10_district";
import { sSelectedEmotion } from "@/s_state/s_selected_emotion";
import { sSearchDistrict } from "@/s_state/s_search_district";

// text="TOP 10 aktivitas berdasarkan kalkulasi kompleks yang menghasilkan prediksi dari penggabungan proses data mining dan olah data Machine Learning & Artificial Intelligence. var = NLP + FR + Socmed + Internet Behaviours"
const Top10ProvinceByConversation = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const update = useForceUpdate();

  // useShallowEffect(() => {
  //   if (!_.isEmpty(sTop10Province.value)) return;
  //   loadData();
  // }, []);

  // async function loadData() {
  //   sSearchDistrict.value = " ";
  //   await funcLoadTop10District();
  //   update();
  // }

  return (
    <>
      <Stack>
        {/* <Button onClick={loadData}>Tekan Sini</Button> */}
        <Paper
          h={780}
          shadow={"sm"}
          p={"md"}
          // bg={stylesGradient1}
          sx={{
            overflow: "scroll",
          }}
        >
          <PageTitle title="Top 10 Province By Emotion" />
          <Group>
            <TextInput
              variant="filled"
              radius={100}
              onChange={async (e) => {
                sSearchProvince.value = e.currentTarget.value;
                await funcLoadTop10Province();
                update();
              }}
              icon={<MdSearch />}
              placeholder="search"
            />
          </Group>
          <Stack>
            <Table
              verticalSpacing={"md"}
              // bg={stylesGradient1}
            >
              <thead>
                <tr>
                  <th>NO</th>
                  <th>PROVINCE</th>
                  <th>LOCKED AUDIENCE</th>
                  <th>FILTERED AUDIENCE</th>
                  <th>TRUST</th>
                  <th>JOY</th>
                  <th>SURPRISE</th>
                  <th>ANTICIPATION</th>
                  <th>SADNESS</th>
                  <th>FEAR</th>
                  <th>ANGER</th>
                  <th>DISGUST</th>

                  {/* {Object.keys(_.omit(sTop10ProvinceTake.value[0], "id")).map(
                    (v, i) => (
                      <th key={i}>
                        <Text c={"cyan.8"} fw={"bold"}>
                          {_.upperCase(v)}
                        </Text>
                      </th>
                    )
                  )} */}
                </tr>
              </thead>
              <tbody>
                {sTop10ProvinceTake.value.map((v: any, i) => (
                  <tr key={i}>
                    <td style={{ padding: 0 }}>
                      <Paper
                        // bg={"white"}
                        p={"xs"}
                      >
                        <Text
                          fw={"bold"}
                          // color={"gray"}
                        >
                          {v.no}
                        </Text>
                      </Paper>
                    </td>
                    <td style={{ padding: 0 }}>
                      <Paper
                        // bg={"white"}
                        p={"xs"}
                      >
                        <Tooltip label={v.name}>
                          <Text
                            lineClamp={1}
                            fw={"bold"}
                            // color={"gray"}
                          >
                            {v.name}
                          </Text>
                        </Tooltip>
                      </Paper>
                    </td>
                    <td style={{ padding: 0 }}>
                      <Paper radius={0} p={"xs"}>
                        <Text fw={"bold"} align="right">
                          {Intl.NumberFormat("id-ID").format(v.total)}
                        </Text>
                      </Paper>
                    </td>
                    <td style={{ padding: 0 }}>
                      <Paper radius={0} p={"xs"}>
                        <Text
                          fw={"bold"}
                          sx={{
                            textAlign: "right",
                          }}
                        >
                          {Intl.NumberFormat("id-ID").format(
                            _.sum([
                              v.trust,
                              v.joy,
                              v.surprise,
                              v.anticipation,
                              v.sadness,
                              v.fear,
                              v.anger,
                              v.disgust,
                            ])
                          )}
                        </Text>
                      </Paper>
                    </td>
                    <td style={{ padding: 0 }}>
                      <Paper bg={"green.1"} p={"xs"} radius={0}>
                        <Text fw={"bold"} color={"gray"} align="right">
                          {Intl.NumberFormat("id-ID").format(v.trust)}
                        </Text>
                      </Paper>
                    </td>
                    <td style={{ padding: 0 }}>
                      <Paper bg={"green.1"} p={"xs"} radius={0}>
                        <Text fw={"bold"} color={"gray"} align="right">
                          {Intl.NumberFormat("id-ID").format(v.joy)}
                        </Text>
                      </Paper>
                    </td>
                    <td style={{ padding: 0 }}>
                      <Paper bg={"green.1"} p={"xs"} radius={0}>
                        <Text fw={"bold"} color={"gray"} align="right">
                          {Intl.NumberFormat("id-ID").format(v.surprise)}
                        </Text>
                      </Paper>
                    </td>
                    <td style={{ padding: 0 }}>
                      <Paper bg={"gray.1"} p={"xs"} radius={0}>
                        <Text fw={"bold"} color={"gray"} align="right">
                          {Intl.NumberFormat("id-ID").format(v.anticipation)}
                        </Text>
                      </Paper>
                    </td>
                    <td style={{ padding: 0 }}>
                      <Paper bg={"pink.1"} p={"xs"} radius={0}>
                        <Text fw={"bold"} color={"gray"} align="right">
                          {Intl.NumberFormat("id-ID").format(v.sadness)}
                        </Text>
                      </Paper>
                    </td>
                    <td style={{ padding: 0 }}>
                      <Paper bg={"pink.1"} p={"xs"} radius={0}>
                        <Text fw={"bold"} color={"gray"} align="right">
                          {Intl.NumberFormat("id-ID").format(v.fear)}
                        </Text>
                      </Paper>
                    </td>
                    <td style={{ padding: 0 }}>
                      <Paper bg={"pink.1"} p={"xs"} radius={0}>
                        <Text fw={"bold"} color={"gray"} align="right">
                          {Intl.NumberFormat("id-ID").format(v.anger)}
                        </Text>
                      </Paper>
                    </td>
                    <td style={{ padding: 0 }}>
                      <Paper bg={"pink.1"} p={"xs"} radius={0}>
                        <Text fw={"bold"} color={"gray"} align="right">
                          {Intl.NumberFormat("id-ID").format(v.disgust)}
                        </Text>
                      </Paper>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Group position="right">
              <Pagination
                total={Math.ceil(sTop10Province.value.length / pageSize)}
                value={page}
                onChange={(val) => {
                  const start = (val - 1) * pageSize;
                  const end = start + pageSize;
                  const pageItem = _.slice(sTop10Province.value, start, end);
                  setPage(val);
                  sTop10ProvinceTake.value = pageItem;
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
