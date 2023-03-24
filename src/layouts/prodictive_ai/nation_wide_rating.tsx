import { listEmotionColor } from "@/assets/list_emotion_color";
import { funcLoadNationWideRating } from "@/fun_load/func_load_nation_wide_rating";
import { gCandidate } from "@/g_state/g_candidate";
import { gSelectedView } from "@/g_state/g_dasboard";
import { gNationWideRating } from "@/g_state/nation_wide_rating/g_nation_wide_rating";
import { gSelectedCandidate1 } from "@/g_state/nation_wide_rating/g_selected_candidate1";
import { gSelectedCandidate2 } from "@/g_state/nation_wide_rating/g_selected_candidate2";
import { ModelNationWideRating } from "@/model/predictive_ai/nation_wide_rating";
import {
  Box,
  Button,
  Flex,
  Image,
  Paper,
  Select,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useForceUpdate } from "@mantine/hooks";
import { EChartsOption } from "echarts";
import EChartsReact from "echarts-for-react";
import _ from "lodash";
import { useState } from "react";
import toast from "react-simple-toasts";
import PageTitle from "../page_title";

const NationChartItem = ({
  data,
  height,
}: {
  data: ModelNationWideRating | any;
  height: number;
}) => {
  const dataNya = _.omit(data, ["candidate1", "candidate2"]);
  const option: EChartsOption = {
    // title: {
    //   text: "World Population",
    // },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    // legend: {},
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      boundaryGap: [0, 0.01],
      max: 100,
    },
    yAxis: {
      type: "category",
      data: Object.keys(dataNya),
    },
    series: [
      {
        // name: "2011",
        type: "bar",
        data: Object.keys(dataNya).map((v) => ({
          label: v,
          value: dataNya[v],
          itemStyle: {
            color: listEmotionColor.find(
              (c) => _.lowerCase(c.name) == _.lowerCase(v)
            )?.color,
          },
        })) as any,
      },
    ],
  };
  return (
    <>
      <EChartsReact
        style={{
          height: height,
          width: "100%",
        }}
        option={option}
      />
    </>
  );
};

const NationWideRating = () => {
  const update = useForceUpdate();
  if (gSelectedView.value != "Nation Wide Rating")
    return <>{gSelectedView.value}</>;
  return (
    <>
      {/* <Title color={"cyan.8"}>{_.upperCase(gSelectedView.value)}</Title> */}
      <PageTitle />
      <Flex
        justify={"end"}
        // p={"md"}
        // bg={"gray.2"}
        pos={"sticky"}
        top={70}
        sx={{
          zIndex: 100,
        }}
      >
        <Select
          onChange={(val) => {
            if (val) {
              gSelectedCandidate1.set(Number(val));
              update();
            }
          }}
          placeholder={
            gCandidate.value.find((v) => v.id == gSelectedCandidate1.value)
              ?.name
          }
          data={
            gCandidate.value.map((v) => ({
              label: v.name,
              value: v.id,
              disabled: v.id == gSelectedCandidate2.value,
            })) as []
          }
        />
        <Select
          onChange={(val) => {
            if (val) {
              gSelectedCandidate2.set(Number(val));
              update();
            }
          }}
          placeholder={
            gCandidate.value.find((v) => v.id == gSelectedCandidate2.value)
              ?.name
          }
          data={
            gCandidate.value.map((v) => ({
              label: v.name,
              value: v.id,
              disabled: v.id == gSelectedCandidate1.value,
            })) as []
          }
        />
        <Button
          onClick={async () => {
            await funcLoadNationWideRating();
            update();
          }}
        >
          Proccess
        </Button>
      </Flex>
      <Space h={70} />
      <Flex direction={"column"}>
        <Flex justify={"space-evenly"}>
          <Stack justify={"center"}>
            <Image
              radius={100}
              width={200}
              src={
                gCandidate.value.find((v) => v.id === gSelectedCandidate1.value)
                  ?.img
              }
              alt={gSelectedCandidate1.value.toString()}
            />
            <Text fw={"bold"} align="center">
              {_.upperCase(
                gCandidate.value.find((v) => v.id === gSelectedCandidate1.value)
                  ?.name
              )}
            </Text>
          </Stack>
          <Stack justify={"center"} align={"center"}>
            <Image
              radius={100}
              width={200}
              src={
                gCandidate.value.find((v) => v.id === gSelectedCandidate2.value)
                  ?.img
              }
              alt={gSelectedCandidate2.value.toString()}
            />
            <Text align="center" fw={"bold"}>
              {_.upperCase(
                gCandidate.value.find((v) => v.id === gSelectedCandidate2.value)
                  ?.name
              )}
            </Text>
          </Stack>
        </Flex>
        <Space h={54} />
        <Paper w={"100%"} p={"md"}>
          <NationChartItem data={gNationWideRating.value as any} height={500} />
        </Paper>
      </Flex>
      {/* {gNationWideRating.value
        .filter(
          (v) => v.candidate1 == candidate1 && v.candidate2 == candidate2
        )
        .map((v, i) => (
          <Box key={i} w={"100%"}>
            <Flex p={"md"} direction={"row"} w={"100%"}>
              <Flex w={300} bg="blue">
                <Image src={v.candidate1Img} alt={v.candidate1Name} />
                <Image src={v.candidate2Img} alt={v.candidate2Name} />
              </Flex>
              <Box w={"100%"} h={500}>
                <NationChartItem data={v} height={500} />
              </Box>
            </Flex>
          </Box>
        ))} */}
    </>
  );
};

export default NationWideRating;
