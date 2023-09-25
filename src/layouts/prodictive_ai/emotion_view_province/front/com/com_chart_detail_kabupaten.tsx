import { listEmotionColor } from "@/assets/list_emotion_color";
import { listColorChart } from "@/global/fun/color_chart";
import { Group, Stack, Text, Title } from "@mantine/core";
import { EChartsOption } from "echarts";
import EChartsReact from "echarts-for-react";
import _ from "lodash";
import useTranslate from 'next-translate/useTranslation'

export function ComChartDetailKabupaten({ data }: { data: any }) {
  const { t, lang } = useTranslate();
  const option: EChartsOption = {
    // radiusAxis: {},
    // polar: {},
    // angleAxis: {
    //   type: "category",
    //   // data: !data ? [] : _.keys(data),
    //   data: !data ? [] : [t('common:trust'), t('common:joy'), t('common:surprise'), t('common:anticipation'), t('common:sadness'), t('common:fear'), t('common:anger'), t('common:disgust')],
    //   startAngle: 75,
    //   // axisLabel: {
    //   //   rotate: 45
    //   // }
    // },
    // tooltip: {
    //   show: true,
    //   formatter: (a: any, b) => {
    //     return `
    //           <i>${_.upperCase(t('common:' + a.data.name))}</i>
    //           <h1>${Intl.NumberFormat("id-ID").format(a.value)}</h1>`;
    //   },
    // },
    // series: [
    //   {
    //     type: "bar",
    //     coordinateSystem: "polar",
    //     data: !data
    //       ? []
    //       : Object.keys(data).map(
    //         (v) =>
    //         ({
    //           name: v,
    //           value: data[v],
    //           itemStyle: {
    //             color:
    //               listEmotionColor.find((v2) => _.lowerCase(v2.name) == v)
    //                 ?.color ?? "gray",
    //           },
    //         } as any)
    //       ),
    //     itemStyle: {
    //       shadowBlur: 20,
    //       shadowOffsetX: 0,
    //       shadowColor: "rgba(0, 0, 0, 0.5)",
    //     },
    //     barWidth: 80,
    //   },
    // ],
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
    xAxis: [
      {
        type: "category",
        data: [
          t("common:trust"),
          t("common:joy"),
          t("common:surprise"),
          t("common:anticipation"),
          t("common:sadness"),
          t("common:fear"),
          t("common:anger"),
          t("common:disgust"),
        ],
        axisTick: {
          alignWithLabel: true,
        },

        axisLabel: {
          verticalAlign: "middle",
          color: "white",
          rotate: 45,
        }
      },
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          color: "white"
        }
      },

    ],
    series: [
      {
        // name: 'Direct',
        type: "bar",
        barWidth: "60%",
        data: Object.keys(data ?? []).map(
          (v) =>
          ({
            name: _.lowerCase(t("common:" + v)),
            value: data[v],
            itemStyle: {
              color:
                listColorChart.find((v2) => _.lowerCase(v2.name) == v)
                  ?.color ?? "gray",
            },
          } as any)
        ),
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
