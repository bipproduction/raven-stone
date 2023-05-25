import { listEmotionColor } from "@/assets/list_emotion_color";
import { Group, Stack, Text, Title } from "@mantine/core";
import { EChartsOption } from "echarts";
import EChartsReact from "echarts-for-react";
import _ from "lodash";

export function ComChartDetailKabupaten({ data }: { data: any }) {
  const option: EChartsOption = {
    radiusAxis: {},
    polar: {},
    angleAxis: {
      type: "category",
      data: !data ? [] : _.keys(data),
      startAngle: 75,
      // axisLabel: {
      //   rotate: 45
      // }
    },
    tooltip: {
      show: true,
      formatter: (a: any, b) => {
        return `
              <i>${_.upperCase(a.data.name)}</i>
              <h1>${Intl.NumberFormat("id-ID").format(a.value)}</h1>`;
      },
    },
    series: [
      {
        type: "bar",
        coordinateSystem: "polar",
        data: !data
          ? []
          : Object.keys(data).map(
              (v) =>
                ({
                  name: v,
                  value: data[v],
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
      <Stack w={"100%"}>
        <EChartsReact style={{ width: "100%" }} option={option} />
      </Stack>
    </>
  );
}
