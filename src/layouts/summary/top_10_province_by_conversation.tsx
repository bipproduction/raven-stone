import { funcLoadTop10District } from "@/fun_load/func_load_top_10_district";
import { funcLoadTop10Province } from "@/fun_load/func_load_to_10_province";
// import { gCandidate } from "@/g_state/g_candidate";
// import { gListEmotion } from "@/g_state/g_list_emotion";
// import { gSelectedCandidate } from "@/g_state/g_map_state";
// import { gSelectedEmotion } from "@/g_state/g_selected_emotion";
// import { gTop10Province } from "@/g_state/top_10_province/g_top_10_province";
// import { gTop10ProvinceTake } from "@/g_state/top_10_province/g_top_10_province_take";
import { api } from "@/lib/api";
import { ModelTop10Province } from "@/model/top_10_province";
import { stylesGradient1 } from "@/styles/styles_gradient_1";
import { stylesGradientBluegray } from "@/styles/styles_gradient_blue_gray";
import { stylesGradientBlueWhite } from "@/styles/styles_gradient_blue_white";
import { stylesGradientMixYellowRed } from "@/styles/styles_gradient_mix_yellow_red";
import { stylesGradientYellow } from "@/styles/styles_gradient_yellow";
import { sCandidate } from "@/s_state/s_candidate";
import { sListEmotion } from "@/s_state/s_list_emotion";
import { sSelectedCandidate } from "@/s_state/s_selected_candidate";
import { sSelectedEmotion } from "@/s_state/s_selected_emotion";
import { sTop10Province } from "@/s_state/s_top_10_province";
import { sTop10ProvinceTake } from "@/s_state/s_top_10_province_take";
import {
  ActionIcon,
  Box,
  Flex,
  Group,
  Image,
  Pagination,
  Paper,
  Select,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useForceUpdate, useShallowEffect } from "@mantine/hooks";
import { Avatar } from "antd";
import _ from "lodash";
import { useState } from "react";
import PageTitle from "../page_title";
import Sambutan from "../sambutan";

const Top10ProvinceByConversation = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const update = useForceUpdate();
  if (_.isEmpty(sTop10Province.value)) return <>loading</>;
  return (
    <>
      <Stack>
        <Sambutan />
        <PageTitle text="TOP 10 aktivitas berdasarkan kalkulasi kompleks yang menghasilkan prediksi dari penggabungan proses data mining dan olah data Machine Learning & Artificial Intelligence. var = NLP + FR + Socmed + Internet Behaviours" />
        {/* {JSON.stringify(gTop10ProvinceTake.value)} */}
        <Paper
          shadow={"sm"}
          p={"md"}
          bg={stylesGradient1}
          sx={{
            overflow: "scroll",
          }}
        >
          <Group position="apart" py={"lg"}>
            <Paper p={"md"} bg={stylesGradientBlueWhite} shadow={"md"}>
              <Stack>
                <Flex>
                  {[
                    sCandidate.value.find((v) => v.id == 1),
                    sCandidate.value.find((v) => v.id == 2),
                    sCandidate.value.find((v) => v.id == 3),
                  ].map((v) => (
                    <Box key={v!.id} p={"sm"}>
                      <ActionIcon
                        radius={100}
                        size={63}
                        onClick={async () => {
                          // gSelectedCandidate.set(v!.id.toString());
                          sSelectedCandidate.value = v!.id.toString()
                          await funcLoadTop10District();
                          await funcLoadTop10Province();
                          update();
                        }}
                      >
                        <Avatar
                          size={63}
                          src={v?.img}
                          style={{
                            border:
                              Number(sSelectedCandidate.value) == v?.id
                                ? "4px solid yellow"
                                : "",
                            filter:
                              Number(sSelectedCandidate.value) == v?.id
                                ? "none"
                                : "grayscale(100%)",
                          }}
                        />
                      </ActionIcon>
                    </Box>
                  ))}
                </Flex>
                <Title color={"blue.1"} order={3}>
                  {
                    sCandidate.value.find(
                      (v) => v.id == Number(sSelectedCandidate.value)
                    )?.name
                  }
                </Title>
              </Stack>
            </Paper>
            <Group position="right">
              <Select
                placeholder={sSelectedEmotion.value}
                variant={"filled"}
                searchable
                label={"sort emotion"}
                data={sListEmotion.value.map((v) => ({
                  label: v.name,
                  value: v.name,
                }))}
                onChange={async (val) => {
                  if (val) {
                    // sSelectedEmotion.set(val);
                    sSelectedEmotion.value = val
                    await funcLoadTop10District();
                    await funcLoadTop10Province();
                    update();
                  }
                }}
              />
            </Group>
          </Group>
          <Stack>
            <Table highlightOnHover verticalSpacing={"md"}>
              <thead>
                <tr>
                  {Object.keys(_.omit(sTop10ProvinceTake.value[0], "id")).map(
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
                {sTop10ProvinceTake.value.map((v: any, i) => (
                  <tr key={i}>
                    {Object.keys(_.omit(v, "id")).map((v2, ii) => (
                      <td
                        style={{
                          backgroundColor: [
                            "trust",
                            "joy",
                            "surprise",
                          ].includes(v2)
                            ? "#8BD4A0"
                            : v2 === "anticipation"
                            ? "#BFBFBF"
                            : ["sadness", "fear", "anger", "disgust"].includes(
                                v2
                              )
                            ? "#D48B8B"
                            : "",
                        }}
                        key={ii}
                      >
                        <Box>
                          <Text
                            fw={"bold"}
                            color={
                              v2 != "no" && v2 != "name" && v2 != "value"
                                ? "white"
                                : ""
                            }
                          >
                            {_.isNaN(Number(v[v2]))
                              ? v[v2]
                              : Intl.NumberFormat("id-ID").format(
                                  Number(v[v2])
                                )}
                          </Text>
                        </Box>
                      </td>
                    ))}
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
