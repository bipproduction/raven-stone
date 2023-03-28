import { listEmotionColor } from "@/assets/list_emotion_color";
import { gCandidate } from "@/g_state/g_candidate";
import { gSelectedView } from "@/g_state/g_selected_view";
import { gSelectedDate } from "@/g_state/g_map_state";
import { gProvince } from "@/g_state/g_province";
import { gSelectedCandidate1 } from "@/g_state/nation_wide_rating/g_selected_candidate1";
import { gSelectedCandidate2 } from "@/g_state/nation_wide_rating/g_selected_candidate2";
import { api } from "@/lib/api";
import {
  Box,
  Button,
  Flex,
  Group,
  Image,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import {
  useForceUpdate,
  useInputState,
  useShallowEffect,
} from "@mantine/hooks";
import { EChartsOption } from "echarts";
import EChartsReact from "echarts-for-react";
import _ from "lodash";
import { useState } from "react";
import { MdJoinInner, MdSearch } from "react-icons/md";
import PageTitle from "../page_title";
import SwipeButton from "./swipe_button";
import { gListDataPredictiveAiCouple } from "@/g_state/g_list_data_predictive_ai_couple";
import { gPredictiveAiSearch } from "@/g_state/g_predictive_ai_search";
import SelectCandidateView from "./select_candidate_view";
import { stylesGradient1 } from "@/styles/styles_gradient_1";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { stylesGradientRed } from "@/styles/styles_gradient_red";

const EmotionItemChart = ({ lsData }: { [key: string]: any }) => {
  const option: EChartsOption = {
    radiusAxis: {},
    polar: {},
    angleAxis: {
      type: "category",
      data: Object.keys(lsData),
      startAngle: 75,
    },
    tooltip: {
      show: true,
      formatter: (a: any, b) => {
        return `
        <i>${_.upperCase(a.data.name)}</i>
        <h1>${a.value} %</h1>
        `;
      },
    },
    series: [
      {
        type: "bar",
        coordinateSystem: "polar",
        data: Object.keys(lsData).map(
          (v) =>
            ({
              name: v,
              value: lsData[v],
              itemStyle: {
                color:
                  listEmotionColor.find((v2) => _.lowerCase(v2.name) == v)
                    ?.color ?? "gray",
              },
            } as any)
        ),
        itemStyle: {
          shadowBlur: 20,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
        barWidth: 80,
      },
    ],
  };
  return (
    <>
      <EChartsReact style={{ width: 400 }} option={option} />
    </>
  );
};

const EmotionalViewViaProvinceCouple = () => {
  const update = useForceUpdate();
  const proccessData = async () => {
    fetch(
      api.apiPredictiveAiEmotionalViewViaProvinceCoupleByDateCandiate +
        `?date=${gSelectedDate.value}&candidate1=${gSelectedCandidate1.value}&candidate2=${gSelectedCandidate2.value}`
    )
      .then((res) => res.json())
      .then((val) => {
        gListDataPredictiveAiCouple.set(val);
        update();
      });
  };

  useShallowEffect(() => {
    proccessData();
  }, []);

  if (gSelectedView.value != "Emotional View Via Province Couple")
    return <>${gSelectedView.value}</>;
  return (
    <>
      {/* <Title color={"cyan.8"}>{_.upperCase(gSelectedView.value)}</Title> */}
      <PageTitle text="EMOTIONAL METERS BRAND MERGER SIMULATION" />
      <SelectCandidateView onProccess={proccessData} onUpdate={update} />
      <Paper p={"md"} shadow={"md"} style={{
        background: stylesGradientRed
        
      }}>
        <Flex direction={"row"} align={"center"} justify={"center"} p={"lg"}>
          <Stack align={"center"}>
            <Image
              radius={100}
              width={100}
              src={
                gCandidate.value.find((v) => v.id == gSelectedCandidate1.value)
                  ?.img
              }
              alt={"gambar_1"}
            />
            <Text>
              {
                gCandidate.value.find((v) => v.id == gSelectedCandidate1.value)
                  ?.name
              }
            </Text>
          </Stack>
          <Box p={"lg"}>
            <MdJoinInner color="orange" size={53} />
          </Box>
          <Stack align={"center"}>
            <Image
              radius={100}
              width={100}
              src={
                gCandidate.value.find((v) => v.id == gSelectedCandidate2.value)
                  ?.img
              }
              alt={"gambar_1"}
            />
            <Text>
              {
                gCandidate.value.find((v) => v.id == gSelectedCandidate2.value)
                  ?.name
              }
            </Text>
          </Stack>
        </Flex>
      </Paper>
      {/* {JSON.stringify(listData)} */}
      <Flex direction={"row"} wrap={"wrap"} justify={"center"} align={"center"}>
        {gListDataPredictiveAiCouple.value
          .filter((v: any) =>
            _.lowerCase(v.name).includes(_.lowerCase(gPredictiveAiSearch.value))
          )
          .map((v: any) => (
            <AnimationOnScroll
              key={v.provinceId}
              initiallyVisible={true}
              animateIn={"animate__backInUp"}
            >
              <Paper
                shadow={"xs"}
                key={v.provinceId}
                p={"xs"}
                m={"md"}
                style={{
                  backgroundImage: stylesGradient1,
                }}
              >
                <Stack
                  key={v.provinceId}
                  w={400}
                  align={"center"}
                  justify={"center"}
                  spacing={"lg"}
                >
                  <EmotionItemChart lsData={v.emotion} />
                  <Stack spacing={0} justify={"center"}>
                    <Title c={"blue.8"}>
                      {Intl.NumberFormat("id-ID").format(v.value)}
                    </Title>
                    <Text align="center" c={"gray"}>
                      SAMPLE
                    </Text>
                  </Stack>
                  <Text size={24}>
                    {gProvince.value.find((p) => p.id == v.provinceId).name}
                  </Text>
                  <EmotionalViewDetailButton />
                </Stack>
              </Paper>
            </AnimationOnScroll>
          ))}
      </Flex>
    </>
  );
};

const EmotionalViewDetailButton = () => {
  return (
    <>
      <Button compact variant={"outline"}>
        DETAIL
      </Button>
    </>
  );
};

export default EmotionalViewViaProvinceCouple;
