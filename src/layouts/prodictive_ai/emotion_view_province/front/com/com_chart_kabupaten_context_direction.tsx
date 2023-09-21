import { EChartsOption } from "echarts";
import _ from "lodash";
import { val_list_color } from "../val/val_list_color";
import EChartsReact from "echarts-for-react";
import useTranslate from "next-translate/useTranslation";
import { Box, Title } from "@mantine/core";

export function ComChartKabupatenContextDirection({ data }: { data: any }) {
  const { t, lang } = useTranslate();
  const option: EChartsOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: function (params: any) {
        return (
          _.upperCase(params[0].name) +
          " : " +
          Intl.NumberFormat("id-ID").format(params[0].value)
        );
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    yAxis: [
      {
        type: "category",
        data: _.sortBy(data, "value").map((v) => t("common:" + v.name)),
        axisTick: {
          alignWithLabel: true,
        },
        axisLabel: {
          color: "white",
          fontSize: "12",
          fontWeight: "bold",
          formatter: function (params: any) {
            return _.startCase(params);
          },
        },
      },
    ],
    xAxis: [
      {
        type: "value",
        axisLabel: {
          color: "white",
          rotate: 45,
        },
      },
    ],
    series: [
      {
        name: "Direct",
        type: "bar",
        barWidth: "60%",
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
      <Box p={"xs"} pt={50}>
        <Box>
        <Title c={"white"} fz={20} >PUBLIC CONCERNS TRENDS</Title>
          <EChartsReact
            style={{
              width: "100%",
            }}
            option={option}
          />
        </Box>
      </Box>

    </>
  );
}
