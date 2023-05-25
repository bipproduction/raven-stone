import { api } from "@/lib/api";
import { Card, Paper, Stack, Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { EChartsOption } from "echarts";
import EChartsReact from "echarts-for-react";
import randomColor from "randomcolor";
import { useState } from "react";
import { val_list_color } from "../val/val_list_color";

export function ComLeaderPersona({ provinceId }: { provinceId: any }) {
  const [listData, setListData] = useState<any[]>([]);

  useShallowEffect(() => {
    loadData();
  }, []);
  function loadData() {
    fetch(api.apiLeaderPersonaByProvinceIdGet + `?provinceId=${provinceId}`)
      .then((v) => v.json())
      .then(setListData);
  }

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
        data: listData.map((v) => v.title),
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
        data: listData.map((v, i) => ({
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
      {/* <pre>{JSON.stringify(listData, null, 2)}</pre> */}
      <Card p={"xs"}>
        <Stack>
          <Title>Leader Persona</Title>
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
