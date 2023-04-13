// import { gCandidate } from "@/g_state/g_candidate";
// import { gListEmotion } from "@/g_state/g_list_emotion";
// import { gSelectedCandidate } from "@/g_state/g_map_state";
// import { gSelectedEmotion } from "@/g_state/g_selected_emotion";
// import { gTop10District } from "@/g_state/top_10_district/g_top_10_district";
// import { gTop10DistrictCount } from "@/g_state/top_10_district/g_top_10_district_take";
import { sTop10District } from "@/s_state/s_top_10_district";
import { sTop10DistrictTake } from "@/s_state/s_top_10_district_take";
import { stylesGradient1 } from "@/styles/styles_gradient_1";
import {
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
import { MdSearch } from "react-icons/md";
import PageTitle from "../page_title";
import { sSearchDistrict } from "@/s_state/s_search_district";
import { funcLoadTop10District } from "@/fun_load/func_load_top_10_district";
import { useForceUpdate } from "@mantine/hooks";

// text="TOP 10 aktivitas berdasarkan kalkulasi kompleks yang menghasilkan prediksi dari penggabungan proses data mining dan olah data Machine Learning & Artificial Intelligence. var = NLP + FR + Socmed + Internet Behaviours"

const Top10DistrictbyConversation = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const update = useForceUpdate();
  // const update = useForceUpdate();

  // if (sTop10District.value && !sTop10District.value[0]) return <></>;

  return (
    <>
      <Paper
        h={780}
        shadow={"sm"}
        p={"md"}
        bg={stylesGradient1}
        sx={{
          overflow: "scroll",
        }}
      >
        <Stack>
          <PageTitle title="Top 10 Region by Emotion" />
          <Group>
            <TextInput
              onChange={(e) => {
                sSearchDistrict.value = e.currentTarget.value;
                funcLoadTop10District();
                // console.log(sSearchDistrict.value)
                update();
              }}
              icon={<MdSearch />}
              placeholder="search"
            />
          </Group>
          <Table verticalSpacing={"md"} bg={stylesGradient1}>
            <thead>
              <tr>
                <th>NO</th>
                <th>CITY</th>
                <th>VALUE</th>
                <th>TRUST</th>
                <th>JOY</th>
                <th>SURPRISE</th>
                <th>ANTICIPATION</th>
                <th>SADNESS</th>
                <th>FEAR</th>
                <th>ANGER</th>
                <th>DISGUST</th>
                {/* {Object.keys(sTop10DistrictCount.value[0]).map((v) => (
                  <th key={v}>
                    <Text c={"cyan.8"} fw={"bold"}>
                      {_.upperCase(v)}
                    </Text>
                  </th>
                ))} */}
              </tr>
            </thead>
            <tbody>
              {sTop10DistrictTake.value.map((v: any, i) => (
                <tr key={i}>
                  <td style={{ padding: 0 }}>
                    <Paper bg={"white"} p={"xs"}>
                      <Text fw={"bold"} color={"gray"}>
                        {v.no}
                      </Text>
                    </Paper>
                  </td>
                  <td style={{ padding: 0 }}>
                    <Paper bg={"white"} p={"xs"}>
                      <Tooltip label={v.city}>
                        <Text lineClamp={1} fw={"bold"} color={"gray"}>
                          {v.city}
                        </Text>
                      </Tooltip>
                    </Paper>
                  </td>
                  <td style={{ padding: 0 }}>
                    <Paper bg={"white"} p={"xs"}>
                      <Text fw={"bold"} color={"gray"}>
                        {Intl.NumberFormat("id-ID").format(v.total)}
                      </Text>
                    </Paper>
                  </td>
                  <td style={{ padding: 0 }}>
                    <Paper bg={"green.1"} p={"xs"}>
                      <Text fw={"bold"} color={"gray"}>
                        {Intl.NumberFormat("id-ID").format(v.trust)}
                      </Text>
                    </Paper>
                  </td>
                  <td style={{ padding: 0 }}>
                    <Paper bg={"green.1"} p={"xs"}>
                      <Text fw={"bold"} color={"gray"}>
                        {Intl.NumberFormat("id-ID").format(v.joy)}
                      </Text>
                    </Paper>
                  </td>
                  <td style={{ padding: 0 }}>
                    <Paper bg={"green.1"} p={"xs"}>
                      <Text fw={"bold"} color={"gray"}>
                        {Intl.NumberFormat("id-ID").format(v.surprise)}
                      </Text>
                    </Paper>
                  </td>
                  <td style={{ padding: 0 }}>
                    <Paper bg={"gray.1"} p={"xs"}>
                      <Text fw={"bold"} color={"gray"}>
                        {Intl.NumberFormat("id-ID").format(v.anticipation)}
                      </Text>
                    </Paper>
                  </td>
                  <td style={{ padding: 0 }}>
                    <Paper bg={"pink.1"} p={"xs"}>
                      <Text fw={"bold"} color={"gray"}>
                        {Intl.NumberFormat("id-ID").format(v.sadness)}
                      </Text>
                    </Paper>
                  </td>
                  <td style={{ padding: 0 }}>
                    <Paper bg={"pink.1"} p={"xs"}>
                      <Text fw={"bold"} color={"gray"}>
                        {Intl.NumberFormat("id-ID").format(v.fear)}
                      </Text>
                    </Paper>
                  </td>
                  <td style={{ padding: 0 }}>
                    <Paper bg={"pink.1"} p={"xs"}>
                      <Text fw={"bold"} color={"gray"}>
                        {Intl.NumberFormat("id-ID").format(v.anger)}
                      </Text>
                    </Paper>
                  </td>
                  <td style={{ padding: 0 }}>
                    <Paper bg={"pink.1"} p={"xs"}>
                      <Text fw={"bold"} color={"gray"}>
                        {Intl.NumberFormat("id-ID").format(v.disgust)}
                      </Text>
                    </Paper>
                  </td>
                  {/* {Object.keys(_.omit(v, "id")).map((v2, ii) => (
                    <td
                      style={{
                        backgroundColor: ["trust", "joy", "surprise"].includes(
                          v2
                        )
                          ? "#8BD4A0"
                          : v2 === "anticipation"
                          ? "#BFBFBF"
                          : ["sadness", "fear", "anger", "disgust"].includes(v2)
                          ? "#D48B8B"
                          : "",
                      }}
                      key={ii}
                    >
                      <Box>
                        <Text
                          fw={"bold"}
                          color={
                            v2 != "no" && v2 != "city" && v2 != "value"
                              ? "white"
                              : ""
                          }
                        >
                          {_.isNaN(Number(v[v2]))
                            ? v[v2]
                            : Intl.NumberFormat("id-ID").format(Number(v[v2]))}
                        </Text>
                      </Box>
                    </td>
                  ))} */}
                </tr>
              ))}
            </tbody>
          </Table>

          {/* {JSON.stringify(sTop10District.value)}       */}
          <Group position="right" mt={"lg"}>
            <Pagination
              total={Math.floor(sTop10District.value.length / pageSize)}
              value={page}
              onChange={(val) => {
                const start = (val - 1) * pageSize;
                const end = start + pageSize;
                const pageItem = _.slice(sTop10District.value, start, end);
                setPage(val);
                sTop10DistrictTake.value = pageItem as any;
              }}
            />
          </Group>
        </Stack>
      </Paper>
    </>
  );
};

export default Top10DistrictbyConversation;
