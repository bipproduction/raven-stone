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
  Avatar,
  Box,
  Center,
  Flex,
  Group,
  HoverCard,
  Image,
  Pagination,
  Paper,
  ScrollArea,
  Select,
  Stack,
  Table,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { useForceUpdate, useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { useState } from "react";
import { MdEmojiEmotions } from "react-icons/md";
import PageTitle from "../page_title";
import Sambutan from "../sambutan";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { listAnimation } from "@/styles/styles_animation";
import AnimateCssReact from "animate-css-reactjs";

// text="TOP 10 aktivitas berdasarkan kalkulasi kompleks yang menghasilkan prediksi dari penggabungan proses data mining dan olah data Machine Learning & Artificial Intelligence. var = NLP + FR + Socmed + Internet Behaviours"
const Top10ProvinceByConversation = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  
  if (_.isEmpty(sTop10Province.value)) return <>loading</>;
  return (
    <>
      <Stack>
       

        {/* {JSON.stringify(gTop10ProvinceTake.value)} */}
        <Paper
          shadow={"sm"}
          p={"md"}
          bg={stylesGradient1}
          sx={{
            overflow: "scroll",
          }}
        >
          
          <PageTitle />
          <Stack>
            {/* <Group position="right">
              <HoverCard>
                <HoverCard.Target>
                  <ActionIcon
                    size={32}
                    radius={100}
                    sx={{
                      border: "2px solid white",
                      borderRadius: "100px",
                    }}
                  >
                    <Image width={24} src={"/icon_robot.svg"} alt={"icon"} />
                  </ActionIcon>
                </HoverCard.Target>
                <HoverCard.Dropdown>
                  <ScrollArea h={300}>
                    <Stack w={500}>
                      <Center>
                        <AnimateCssReact animation="bounce">
                          <Image
                            width={100}
                            src={"/icon_robot.svg"}
                            alt={"icon"}
                          />
                        </AnimateCssReact>
                      </Center>
                      <Text>
                        TRUST (Kepercayaan): Jika seseorang merasa kepercayaan
                        terhadap seseorang atau figure, maka ia merasa yakin
                        bahwa orang atau figure tersebut dapat diandalkan dan
                        memiliki kualitas yang baik, sehingga orang tersebut
                        merasa nyaman dan aman berada di dekat mereka.
                      </Text>
                      <Text>
                        JOY (Kepuasan): Jika seseorang merasa sukacita terhadap
                        seseorang atau figure, maka ia merasa senang, gembira,
                        dan bahagia ketika berada di dekat mereka. Hal ini bisa
                        terjadi karena seseorang merasa diperhatikan, dihargai,
                        atau merasa terhibur.
                      </Text>
                      <Text>
                        SURPRISE (Kejutan): Jika seseorang merasa kejutan
                        terhadap seseorang atau figure, maka ia merasa senang
                        dan terkesan dengan peristiwa atau aksi yang tidak
                        terduga. Hal ini bisa terjadi ketika seseorang
                        mendapatkan hadiah yang tidak ia duga dari seseorang
                        atau figure yang ia sukai.
                      </Text>
                      <Text>
                        ANTICIPATION (Antisipasi): Jika seseorang merasa
                        antisipasi terhadap seseorang atau figure, maka ia
                        merasa sangat menantikan momen atau kejadian tertentu
                        bersama mereka. Hal ini bisa terjadi ketika seseorang
                        merasa sangat menantikan pertemuan atau kegiatan bersama
                        orang atau figure yang mereka sukai.
                      </Text>
                      <Text>
                        SADNESS (Kesedihan): Jika seseorang merasa kesedihan
                        terhadap seseorang atau figure, maka ia merasa sedih
                        atau kecewa karena suatu peristiwa atau kondisi yang
                        tidak menyenangkan terjadi pada mereka atau pada orang
                        atau figure yang mereka sukai.
                      </Text>
                      <Text>
                        FEAR (Ketakutan): Jika seseorang merasa ketakutan
                        terhadap seseorang atau figure, maka ia merasa takut
                        atau cemas terhadap sesuatu yang mungkin terjadi pada
                        mereka atau pada orang atau figure yang mereka sukai.
                      </Text>
                      <Text>
                        ANGER (Kemarahan): Jika seseorang merasa kemarahan
                        terhadap seseorang atau figure, maka ia merasa marah
                        atau tidak puas terhadap suatu peristiwa atau kondisi
                        yang tidak baik terjadi pada mereka atau pada orang atau
                        figure yang mereka sukai.
                      </Text>
                      <Text>
                        DISGUST (Jijik): Jika seseorang merasa jijik terhadap
                        seseorang atau figure, maka ia merasa tidak suka atau
                        tidak nyaman terhadap suatu peristiwa atau kondisi yang
                        terkait dengan orang atau figure yang mereka sukai.
                      </Text>
                    </Stack>
                  </ScrollArea>
                </HoverCard.Dropdown>
              </HoverCard>
            </Group> */}
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
                      <Paper bg={"white"} p={"xs"}>
                        <Text fw={"bold"} color={"gray"}>
                          {v.no}
                        </Text>
                      </Paper>
                    </td>
                    <td style={{ padding: 0 }}>
                      <Paper bg={"white"} p={"xs"}>
                        <Tooltip label={v.name}>
                          <Text lineClamp={1} fw={"bold"} color={"gray"}>
                            {v.name}
                          </Text>
                        </Tooltip>
                      </Paper>
                    </td>
                    <td style={{ padding: 0 }}>
                      <Paper bg={"white"} p={"xs"}>
                        <Text fw={"bold"} color={"gray"}>
                          {Intl.NumberFormat("id-ID").format(v.value)}
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
                    ))} */}
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
