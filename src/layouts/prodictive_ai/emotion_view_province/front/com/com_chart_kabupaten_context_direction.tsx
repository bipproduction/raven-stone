import { EChartsOption } from "echarts";
import _ from "lodash";
import { val_list_color } from "../val/val_list_color";
import EChartsReact from "echarts-for-react";

export function ComChartKabupatenContextDirection({ data }: { data: any }) {
  const option: EChartsOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: function (params: any) {
        return _.upperCase(params[0].name) + " : " + params[0].value ;
      }
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
        data: _.sortBy(data, "value").map((v) => v.name),
        axisTick: {
          alignWithLabel: true,
        },
        axisLabel: {
            formatter: function (params: any) {
              return _.upperCase(params)  ;
            }
          }
      },

    ],
    xAxis: [
      {
        type: "value",
        axisLabel: {
            rotate: 45
        }
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
      <EChartsReact
        style={{
          width: "100%",
        }}
        option={option}
      />
    </>
  );
}
