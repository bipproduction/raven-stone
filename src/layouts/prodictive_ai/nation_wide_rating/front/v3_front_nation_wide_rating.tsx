import {
  AspectRatio,
  BackgroundImage,
  Box,
  Card,
  Center,
  Flex,
  Grid,
  Group,
  Image,
  Loader,
  Paper,
  ScrollArea,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useElementSize, useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import { v3_fun_nation_wide_rating_load_list_data } from "../fun/v3_fun_nation_wide_rating_load_list_data";
import { useAtom } from "jotai";

import { v3_val_nation_wide_rating_selected_candidate } from "../val/v3_nation_wide_rating_selected_candidate";
import { v3_fun_nation_wide_rating_load_list_candidate } from "../fun/v3_fun_nation_wide_rating_load_list_candidate";
import { v3_val_nation_wide_rating_list_candidate } from "../val/v3_nation_wide_rating_list_candidate";
import PageTitle from "@/layouts/page_title";
import { V3ComNationWideRatingSelectCandidate } from "./com/v3_com_nation_wide_rating_select_candidate";
import { V3ComNationWideRatingLineChart } from "./com/v3_com_nation_wide_rating_line_chart";
import TextAnimation from "react-typing-dynamics";
import prs from "html-react-parser";
import { v3_val_nation_wide_rating_list_data } from "../val/v3_nation_wide_rating_list_data";
import EChartsReact from "echarts-for-react";
import { v3_fun_load_chart_data } from "../fun/v3_fun_load_chart_data";
import moment from "moment";
import { v3_val_data_line_chart } from "../val/v3_val_data_line_chart";
import { V3ComChartBar } from "./com/v3_com_chart_bar";
import { v3_val_back_selected_candidate } from "../back/val/v3_val_selected_candidate";
import useTranslate from "next-translate/useTranslation";
import _ from "lodash";
import Trs from "@/fun_load/trs";
import PageSubTitle from "@/global/components/PageSubTitle";
import G from "glob";

export function V3FrontNationWideRating() {
  const { t, lang } = useTranslate();
  const [listData, setListData] = useAtom(v3_val_nation_wide_rating_list_data);
  const [selectedCandidate, setSelectedCandidate] = useAtom(
    v3_val_nation_wide_rating_selected_candidate
  );

  const [dateChart, setDataChart] = useAtom(v3_val_data_line_chart);
  const { ref, width, height } = useElementSize();
  const [listCandidate, setListCandidate] = useAtom(
    v3_val_nation_wide_rating_list_candidate
  );

  useShallowEffect(() => {
    v3_fun_nation_wide_rating_load_list_data({
      setListData,
      candidate1Id: selectedCandidate.candidate1Id,
      candidate2Id: selectedCandidate.candidate2Id,
    });
  }, []);

  if (!listData)
    return (
      <>
        <Loader />
      </>
    );

  return (
    <>
      {/* <Title>Front Nation Wide Rating</Title> */}
      <Stack spacing={"lg"}>
        {/* <PageTitle
          title={_.upperCase(t('common:nation_wide_rating'))}
          text={_.upperCase(t('common:emotional_meters_brand_merger_simulation'))}
        /> */}
        <PageSubTitle text1={t('common:p_national')} text2={t('common:p_popularity_metrics')} />

        <Box px={"xl"}>
          {/* Select candidate */}
          <V3ComNationWideRatingSelectCandidate
            onProccess={() => {
              v3_fun_nation_wide_rating_load_list_data({
                candidate1Id: selectedCandidate.candidate1Id,
                candidate2Id: selectedCandidate.candidate2Id,
                setListData,
              });

              v3_fun_load_chart_data({
                start: moment().subtract(1, "weeks").format("YYYY-MM-DD"),
                end: moment().format("YYYY-MM-DD"),
                selectedCandidate: selectedCandidate,
                setDataChart: setDataChart,
              });
            }}
          />

          <Grid pt={50} align={"center"}>
            {/* Photo candidate */}
            <Grid.Col span={4}>
              <Grid grow>
                {/* Candidate 1 */}
                <Grid.Col span={6}>
                  <Box>
                    <AspectRatio ratio={1 / 1}>
                      <BackgroundImage
                        // key={Math.random()}
                        radius={"md"}
                        w={200}
                        h={200}
                        src={
                          listCandidate?.find(
                            (v) => v.id == selectedCandidate.candidate1Id
                          ).img
                        }
                        // sx={{
                        //   zIndex: 1,
                        // }}
                      >
                        <AspectRatio
                          ratio={3 / 2}
                          sx={{
                            // position: "relative",
                            bottom: "-35%",
                            height: 20,
                            width: "100%",
                            backgroundColor: "#343a40",
                            marginLeft: 2,
                            borderTopRightRadius: 10,
                            borderBottomRightRadius: 10,
                            display: "flex",
                            flex: 1,
                            marginRight: 60,
                          }}
                        >
                          <Title
                            sx={{
                              display: "flex",
                              flex: 1,
                              alignContent: "center",
                            }}
                            fw={"bold"}
                            fz={{ lg: 10, md: 6, sm: 4 }}
                            color="white"
                          >
                            PRESIDENT
                          </Title>

                          {/* <Box
                            // bg="gray"
                            sx={{
                              borderTopRightRadius: 10,
                              borderBottomRightRadius: 10,
                              width: 50,
                              height: 20,
                              // marginLeft: 2,
                              // display: "flex",
                              // justifyContent: "flex-end",
                              // justifyItems: "flex-end",
                              // alignItems: "flex-end",
                              // alignContent: "flex-end",
                              backgroundColor: "gray",
                            }}
                          >
                          </Box> */}
                        </AspectRatio>
                      </BackgroundImage>
                    </AspectRatio>

                    <Center>
                      <Title order={4} c={"white"} pt={20}>
                        {_.upperCase(
                          listCandidate?.find(
                            (v) => v.id == selectedCandidate.candidate1Id
                          ).name
                        )}
                      </Title>
                    </Center>
                  </Box>
                </Grid.Col>

                {/* Candidate 2 */}
                <Grid.Col span={6}>
                  <Box>
                    <AspectRatio ratio={1 / 1}>
                      <BackgroundImage
                        // key={Math.random()}
                        radius={"md"}
                        w={200}
                        h={200}
                        src={
                          listCandidate?.find(
                            (v) => v.id == selectedCandidate.candidate2Id
                          ).img
                        }
                      >
                        <AspectRatio
                          ratio={3 / 2}
                          sx={{
                            bottom: "-35%",
                            height: 20,
                            width: "100%",
                            backgroundColor: "#343a40",
                            borderTopLeftRadius: 10,
                            borderBottomLeftRadius: 10,
                            marginRight: 2,
                            marginLeft: 40,
                          }}
                        >
                          <Text
                            sx={{
                              display: "flex",
                              flex: 1,
                              alignContent: "center",
                            }}
                            fw={"bold"}
                            fz={{ lg: 10, md: 6, sm: 4 }}
                            color="white"
                          >
                            VICE PRESIDENT
                          </Text>
                        </AspectRatio>
                        {/* <Group
                        position="right"
                        sx={{
                          position: "relative",
                          bottom: "-80%",
                          marginRight: 2,
                        }}
                      >
                        <Box
                          bg="gray"
                          sx={{
                            borderTopLeftRadius: 10,
                            borderBottomLeftRadius: 10,

                            width: 100,
                            height: 20,
                          }}
                        >
                          <Center h={20}>
                           
                          </Center>
                        </Box>
                      </Group> */}
                      </BackgroundImage>
                    </AspectRatio>
                    <Center>
                      <Title order={4} c={"white"} pt={20}>
                        {" "}
                        {_.upperCase(
                          listCandidate?.find(
                            (v) => v.id == selectedCandidate.candidate2Id
                          ).name
                        )}
                      </Title>
                    </Center>
                  </Box>
                </Grid.Col>
              </Grid>
            </Grid.Col>

            {/* Text Succes */}
            <Grid.Col span={4}>
              <Group pl={40}>
                <Box>
                  <Text style={{ fontSize: "2.5vw" }} c={"white"} fw={"bold"}>
                    SUCCESS{" "}
                  </Text>
                  <Text style={{ fontSize: "2.5vw" }} c={"white"} fw={"bold"}>
                    PROBABILITY{" "}
                  </Text>
                  <Text
                    style={{ fontSize: "2.5vw" }}
                    c={"white"}
                    fs={"italic"}
                    fw={"lighter"}
                  >
                    PROJECTION{" "}
                  </Text>
                </Box>
              </Group>
            </Grid.Col>

            {/* Persen */}
            <Grid.Col span={4}>
              <Box>
                {!listData ? (
                  <Loader />
                ) : !listData[0] ? (
                  <>
                    <Box>
                      <Title>0 %</Title>
                    </Box>
                  </>
                ) : (
                  <Box>
                    <Text fw={"bold"} style={{ fontSize: "7vw" }} c={"green"}>
                      {`${listData![0].rate}%`}
                    </Text>
                  </Box>
                )}
              </Box>
            </Grid.Col>
          </Grid>

          {/* <Grid pt={100} gutter={"xl"}  justify="space-between" >
            <Grid.Col span={6} >
              <V3ComChartBar />
            </Grid.Col>

            <Grid.Col span={6}>
              <V3ComNationWideRatingLineChart />
            </Grid.Col>
          </Grid> */}

          {/* <Flex pt={"xl"} gap={100}   direction={{base: "row", lg: "row", md: "column", sm: "column"}}>
            <Box style={{minWidth: 500}}>
              <V3ComChartBar />
            </Box>
            <Box style={{minWidth: 500}}>
              <V3ComNationWideRatingLineChart />
            </Box>
          </Flex> */}

          {/* <Group grow position="apart" spacing={100}>
          </Group> */}
        </Box>
      </Stack>
      <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50} pt={30}>
        <Grid.Col span={6}>
          <Box>
            <V3ComChartBar />
          </Box>
        </Grid.Col>
        <Grid.Col span={6}>
          <Box>
            <V3ComNationWideRatingLineChart />
          </Box>
        </Grid.Col>
      </Grid>

      {/* {JSON.stringify(listData)}
      {JSON.stringify(selectedCandidate)} */}
    </>
  );
}
