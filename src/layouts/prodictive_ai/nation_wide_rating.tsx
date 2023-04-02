import { listEmotionColor } from "@/assets/list_emotion_color";
import { funcLoadNationWideRating } from "@/fun_load/func_load_nation_wide_rating";
import { gCandidate } from "@/g_state/g_candidate";
import { gSelectedView } from "@/g_state/g_selected_view";
import { gNationWideRating } from "@/g_state/nation_wide_rating/g_nation_wide_rating";
import { gSelectedCandidate1 } from "@/g_state/nation_wide_rating/g_selected_candidate1";
import { gSelectedCandidate2 } from "@/g_state/nation_wide_rating/g_selected_candidate2";
import { ModelNationWideRating } from "@/model/predictive_ai/nation_wide_rating";
import { stylesGradient1 } from "@/styles/styles_gradient_1";
import { stylesGradientRed } from "@/styles/styles_gradient_red";
import { stylesGradientYellow } from "@/styles/styles_gradient_yellow";
import {
  ActionIcon,
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
import { MdSwapHoriz } from "react-icons/md";
import toast from "react-simple-toasts";
import PageTitle from "../page_title";
import SwipeButton from "./swipe_button";

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
      formatter: (a: any, b) => {
        return `
        <i>${_.upperCase(a[0].name)}</i>
        <br/>
       <h1> ${a[0].value} %</h1>
        `;
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
      axisLabel: {
        formatter: (a: any) => {
          return `${a} %`;
        },
      },
    },
    yAxis: {
      type: "category",
      data: Object.keys(dataNya).reverse(),
    },
    series: [
      {
        type: "bar",
        itemStyle: {
          borderRadius: 100,
          // borderWidth: 1,
          // borderType: 'solid',
          // shadowBlur: 3
        },
        data: Object.keys(dataNya)
          .map((v) => ({
            label: v,
            value: dataNya[v],
            data: v,
            itemStyle: {
              color: listEmotionColor.find(
                (c) => _.lowerCase(c.name) == _.lowerCase(v)
              )?.color,
            },
          }))
          .reverse() as any,
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
      <PageTitle text="EMOTIONAL METERS BRAND MERGER SIMULATION" />
      <Paper
        bg={"blue.1"}
        pos={"sticky"}
        p={"xs"}
        top={50}
        sx={{
          zIndex: 100,
        }}
        shadow={"md"}
      >
        <Flex justify={"end"} gap={"xs"}>
          <Select
            key={Math.random()}
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
          <SwipeButton update={update} />
          <Select
            key={Math.random()}
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
      </Paper>
      <Space h={70} />
      <Flex direction={"column"}>
        <Paper bg={stylesGradientYellow} shadow={"md"} p={"md"}>
          <Flex justify={"space-evenly"}>
            <Stack justify={"center"} align={"center"}>
              <Image
                radius={100}
                width={100}
                src={
                  gCandidate.value.find(
                    (v) => v.id === gSelectedCandidate1.value
                  )?.img
                }
                alt={gSelectedCandidate1.value.toString()}
              />
              <Text fw={"bold"} align="center">
                {_.upperCase(
                  gCandidate.value.find(
                    (v) => v.id === gSelectedCandidate1.value
                  )?.name
                )}
              </Text>
            </Stack>
            <Stack justify={"center"} align={"center"}>
              <Image
                radius={100}
                width={100}
                src={
                  gCandidate.value.find(
                    (v) => v.id === gSelectedCandidate2.value
                  )?.img
                }
                alt={gSelectedCandidate2.value.toString()}
              />
              <Text align="center" fw={"bold"}>
                {_.upperCase(
                  gCandidate.value.find(
                    (v) => v.id === gSelectedCandidate2.value
                  )?.name
                )}
              </Text>
            </Stack>
          </Flex>
        </Paper>
        <Space h={54} />
        <Paper w={"100%"} p={"md"} bg={stylesGradient1}>
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
