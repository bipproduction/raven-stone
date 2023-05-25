import { api } from "@/lib/api";
import { Card, Paper, Stack, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { EChartsOption } from "echarts";
import EChartsReact from "echarts-for-react";
import _ from "lodash";
import randomColor from "randomcolor";
import { useState } from "react";
import { val_list_color } from "../val/val_list_color";

export function ComContextDirection({ provinceId }: { provinceId: any }) {
  const [listContextDirection, setListContextDirection] = useState<any[]>([]);
  useShallowEffect(() => {
    loadData();
  }, []);

  const option: EChartsOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
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
        data: listContextDirection.map((v) => v.name),
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    xAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Direct",
        type: "bar",
        barWidth: "60%",
        data: listContextDirection.map((v, i) => ({
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
      <Card p={"xs"}>
        <Title>Context Direction</Title>
        <Stack>
          <EChartsReact
            style={{
              width: 600,
            }}
            option={option}
          />
        </Stack>
      </Card>
    </>
  );
}
