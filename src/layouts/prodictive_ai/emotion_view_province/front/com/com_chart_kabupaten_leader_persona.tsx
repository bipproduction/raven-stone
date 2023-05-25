import EChartsReact from "echarts-for-react";
import _ from "lodash";
import { val_list_color } from "../val/val_list_color";
import { Stack } from "@mantine/core";
import { EChartsOption } from "echarts";

export function ComChartKabupatenLeaderPersona({ data }: { data: any }) {
  
  const option: EChartsOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: function (params: any) {
        return params[0].name + " : " + params[0].value + " %";
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
        data: _.sortBy(data, "value").map((v) => v.title),
        axisTick: {
          alignWithLabel: true,
        },
        // axisLabel: {
        //     rotate: 45
        // }
      },
    ],
    xAxis: [
      {
        type: "value",
        axisLabel: {
          formatter: function (params: any) {
            return params + "%";
          },
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
      <Stack>
        {/* <pre>{JSON.stringify(data)}</pre> */}
        <EChartsReact
          style={{
            width: "100%",
          }}
          option={option}
        />
      </Stack>
    </>
  );
}
