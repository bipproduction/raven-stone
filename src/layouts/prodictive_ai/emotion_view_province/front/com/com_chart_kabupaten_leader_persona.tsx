import EChartsReact from "echarts-for-react";
import _ from "lodash";
import { val_list_color } from "../val/val_list_color";
import { Box, Center, Stack, Title } from "@mantine/core";
import { EChartsOption } from "echarts";
import useTranslate from 'next-translate/useTranslation'


export function ComChartKabupatenLeaderPersona({ data }: { data: any }) {
  const { t, lang } = useTranslate();

  const option: EChartsOption = {
    radiusAxis: {},
    polar: {},
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: function (params: any) {
        return _.upperCase(params[0].name) + " : " + params[0].value + " %";
      },
    },
    angleAxis: {
      type: "category",
      data: _.sortBy(data, "value").map((v) =>
        t("common:" + _.lowerCase(v.title))
      ),
      axisTick: {
        alignWithLabel: true,
      },
      axisLabel: {
        color: "white",
        fontSize:"10",
        formatter: function (params: any) {
          return _.upperCase(params);
        },
      },
      startAngle: 60,
    },
    series: [
      {
        name: "Direct",
        type: "bar",
        coordinateSystem: "polar",
        barWidth: 80,
        data: _.sortBy(data, "value").map((v, i) => ({
          value: v.value,
          itemStyle: {
            color: val_list_color[i],
          },
        })),
      },
    ],
  };
  return (
    <>
      <Box p={"xs"} pt={20} pb={20}>
          <Title ta={"center"} c={"white"} fz={20} >
            {"LEADER TRAIT ASSESSMENT"}
          </Title>
        <Center pt={20}>
          <EChartsReact
            style={{
              width: "100%",
            }}
            option={option}
          />
        </Center>
      </Box>
    </>
  );
}
