import { listEmotionColor } from "@/assets/list_emotion_color";
import { EChartsOption } from "echarts";
import EChartsReact from "echarts-for-react";
import _ from "lodash";
// trust
// joy
// surprise
// anticipation
// sadness
// fear
// anger
// disgust
export function NationWideRatingV2Chart({ data }: { data: any }) {
  const option: EChartsOption = {
    tooltip: {
        formatter: (a: any) => {
            return `<h1>${a.value} %</h1>`;
        }
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
      type: "value",
      max: 100,
    },
    series: [
      {
        itemStyle: {
          borderRadius: 100,
        },
        data: [
          { name: "trust", value: data ? data.trust : 0 },
          { name: "joy", value: data ? data.joy : 0 },
          { name: "surprise", value: data ? data.surprise : 0 },
          { name: "anticipation", value: data ? data.anticipation : 0 },
          { name: "sadness", value: data ? data.sadness : 0 },
          { name: "fear", value: data ? data.fear : 0 },
          { name: "anger", value: data ? data.anger : 0 },
          { name: "disgust", value: data ? data.disgust : 0 },
        ].map((v) => ({
          value: v.value,
          itemStyle: {
            color: listEmotionColor.find(
              (c) => _.lowerCase(c.name) == _.lowerCase(v.name)
            )?.color,
          },
        })) as any,
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
      <EChartsReact
        style={{
          height: 460,
        }}
        option={option}
      />
    </>
  );
}
