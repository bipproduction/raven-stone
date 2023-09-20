import { api } from "@/lib/api";
import { Box, Card, Paper, Stack, Text, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { EChartsOption } from "echarts";
import EChartsReact from "echarts-for-react";
import _ from "lodash";
import randomColor from "randomcolor";
import { useState } from "react";
import { val_list_color } from "../val/val_list_color";
import useTranslate from 'next-translate/useTranslation'

export function ComContextDirection({ provinceId }: { provinceId: any }) {
  const [listContextDirection, setListContextDirection] = useState<any[]>([]);
  const { t, lang } = useTranslate();
  useShallowEffect(() => {
    loadData();
  }, []);

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
          Intl.NumberFormat().format(params[0].value)
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
        data: _.sortBy(listContextDirection, "value").map((v) => t('common:'+v.name)),
        axisTick: {
          alignWithLabel: true,
        },
        axisLabel: {
          formatter: function (params: any) {
            return _.upperCase(params);
          },
        },
      },
    ],
    xAxis: [
      {
        type: "value",
        axisLabel: {
          rotate: 45,
        },
      },
    ],
    series: [
      {
        name: "Direct",
        type: "bar",
        barWidth: "60%",
        data: _.sortBy(listContextDirection, "value").map((v, i) => ({
          value: v.value,
          itemStyle: {
            color: val_list_color[i],
          },
        })),
      },
    ],
  };

  function loadData() {
    fetch(api.apiContextDirectionByProvinceIdGet + `?provinceId=${provinceId}`)
      .then((res) => res.json())
      .then(setListContextDirection);
  }
  return (
    <>
      {/* <pre>{JSON.stringify(listContextDirection, null, 2)}</pre> */}
      <Box p={"xs"}>
        <Box>
        <Title c={"white"} fz={20} pl={140}>PUBLIC CONCERNS TRENDS</Title>
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
