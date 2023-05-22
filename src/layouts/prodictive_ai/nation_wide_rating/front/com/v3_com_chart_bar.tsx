import { listEmotionColor } from "@/assets/list_emotion_color";
import { Box, Paper } from "@mantine/core";
import { EChartsOption } from "echarts";
import EChartsReact from "echarts-for-react";
import { useAtom } from "jotai";
import _ from "lodash";
import { v3_val_data_line_chart } from "../../val/v3_val_data_line_chart";
import { v3_val_nation_wide_rating_list_data } from "../../val/v3_nation_wide_rating_list_data";

export function V3ComChartBar() {
  const [listData, setListData] = useAtom(v3_val_nation_wide_rating_list_data);

  const option: EChartsOption = {
    title: {
      top: 0,
      text: "100 %",
    },
    tooltip: {
      formatter: (a: any) => {
        return `<h1>${a.value} %</h1>`;
      },
    },
    xAxis: {
      type: "category",
      data: [
        "trust",
        "joy",
        "surprise",
        "anticipation",
        "sadness",
        "fear",
        "anger",
        "disgust",
      ],
    },
    yAxis: {
      axisLabel: {
        formatter: (a: any) => {
          return `${a} %`;
        },
      },
      // type: "category",
      // data: ["10", "50", "100"],
    },
    series: [
      {
        itemStyle: {
          borderRadius: 100,
        },
        label: {
          show: true,
          position: "inside",
          formatter: (a: any) => {
            return `${a.value} %`;
          },
        },
        //   data: [],
        data: !listData![0]
          ? []
          : (_.keys(
              _.omit(listData![0], [
                "id",
                "candidate1Id",
                "candidate2Id",
                "updatedAt",
                "createdAt",
                "time",
                "cityId",
              ])
            )
              .map((v) => ({
                name: v,
                value: listData![0][v],
              }))
              .map((v) => ({
                value: v.value,
                itemStyle: {
                  color: listEmotionColor.find(
                    (c) => _.lowerCase(c.name) == _.lowerCase(v.name)
                  )?.color,
                },
              })) as any),
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)",
        },
      },
    ],
  };
  return (
    <>
      <Paper p={"xs"}>
        {/* {JSON.stringify(listData)} */}
        <EChartsReact
          style={{
            height: 460,
            margin: 0,
          }}
          option={option}
        />
      </Paper>
    </>
  );
}
