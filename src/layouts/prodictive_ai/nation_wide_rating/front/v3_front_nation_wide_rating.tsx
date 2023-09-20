import {
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
        <PageSubTitle text1="NATIONAL" text2="POPULARITY METRICS" />

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

          {/* Photo candidate */}
          <Flex pt={50} gap={60} align={"center"}>
            <Group spacing={"xl"}>
              {/* Candidate 1 */}
              <Box>
                <Image
                  // key={Math.random()}
                  radius={"md"}
                  width={160}
                  height={160}
                  src={
                    listCandidate?.find(
                      (v) => v.id == selectedCandidate.candidate1Id
                    ).img
                  }
                  alt=""
                />
                <Center pt={"xs"}>
                  <Title order={3}>
                    {
                      listCandidate?.find(
                        (v) => v.id == selectedCandidate.candidate1Id
                      ).name
                    }
                  </Title>
                </Center>
              </Box>
              {/* Candidate 2 */}
              <Box>
                <Image
                  // key={Math.random()}
                  radius={"md"}
                  width={160}
                  height={160}
                  src={
                    listCandidate?.find(
                      (v) => v.id == selectedCandidate.candidate2Id
                    ).img
                  }
                  alt=""
                />
                <Center pt={"xs"}>
                  <Title order={3}>
                    {
                      listCandidate?.find(
                        (v) => v.id == selectedCandidate.candidate2Id
                      ).name
                    }
                  </Title>
                </Center>
              </Box>
            </Group>
            <Flex direction={"column"}>
              <Text fz={40} c={"white"} fw={"bold"}>
                SUCCESS{" "}
              </Text>
              <Text fz={40} c={"white"} fw={"bold"}>
                PROBABILITY{" "}
              </Text>
              <Text fz={40} c={"white"} fs={"italic"} fw={"lighter"}>
                PROJECTION{" "}
              </Text>
            </Flex>

            <Box>
              {!listData ? (
                <Loader />
              ) : !listData[0] ? (
                <>
                  <Title>0 %</Title>
                </>
              ) : (
                <Title fz={120} c={"green"}>
                  {listData![0].rate} %
                </Title>
              )}
            </Box>
          </Flex>

          {/* Foto Kandidat */}
          {/* <SimpleGrid cols={2}>
          <Flex gap={"lg"} align={"end"}>
            <Image
              // key={Math.random()}
              radius={"md"}
              width={100}
              height={100}
              src={
                listCandidate?.find(
                  (v) => v.id == selectedCandidate.candidate1Id
                ).img
              }
              alt=""
            />
            <Title>
              {
                listCandidate?.find(
                  (v) => v.id == selectedCandidate.candidate1Id
                ).name
              }
            </Title>
          </Flex>

          <Flex gap={"lg"} align={"end"} justify={"end"}>
            <Title>
              {
                listCandidate?.find(
                  (v) => v.id == selectedCandidate.candidate2Id
                ).name
              }
            </Title>
            <Image
              // key={Math.random()}
              radius={"md"}
              width={100}
              height={100}
              src={
                listCandidate?.find(
                  (v) => v.id == selectedCandidate.candidate2Id
                ).img
              }
              alt=""
            />
          </Flex>
        </SimpleGrid> */}

          <Grid pt={50}>
            <Grid.Col span={6}>
              <Stack spacing={"lg"} ref={ref}>
                <V3ComChartBar />
              </Stack>
            </Grid.Col>
            <Grid.Col span={6}>
              {" "}
              <V3ComNationWideRatingLineChart />
            </Grid.Col>
          </Grid>
        </Box>
      </Stack>

      {/* {JSON.stringify(listData)}
      {JSON.stringify(selectedCandidate)} */}
    </>
  );
}
