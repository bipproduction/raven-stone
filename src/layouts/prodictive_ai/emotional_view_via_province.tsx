import { listEmotionColor } from "@/assets/list_emotion_color";
import { gEmotionalViewViaProvince } from "@/g_state/predictive_ai/g_emotional_view_via_province";
import { Box, Group, Text } from "@mantine/core";
import { EChartsOption } from "echarts";
import EChartsReact from "echarts-for-react";
import _ from "lodash";

const EmotionItemChart = ({ lsData }: { [key: string]: any }) => {
  const option: EChartsOption = {
    radiusAxis: {},
    polar: {},
    angleAxis: {
      type: "category",
      data: Object.keys(lsData),
      startAngle: 75,
    },
    tooltip: {
      show: true,
      formatter: (a: any, b) => {
        return `${a.data.name}: ${a.value} %`;
      },
    },
    series: [
      {
        type: "bar",
        coordinateSystem: "polar",
        data: Object.keys(lsData).map(
          (v) =>
            ({
              name: v,
              value: lsData[v],
              itemStyle: {
                color:
                  listEmotionColor.find((v2) => _.lowerCase(v2.name) == v)?.color ??
                  "gray",
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
      <EChartsReact option={option} />
    </>
  );
};

const EmotionalViewViaProvince = () => {
  return (
    <>
      <Text>Emotional View Via Province</Text>
      {/* {JSON.stringify(gEmotionalViewViaProvince.value[0])} */}
      <Group>
        {gEmotionalViewViaProvince.value.map((v) => (
          <Box key={v.id} w={300} h={300}>
            <EmotionItemChart lsData={_.omit(v, "no", "id", "name", "value")} />
          </Box>
        ))}
      </Group>
    </>
  );
};

export default EmotionalViewViaProvince;
