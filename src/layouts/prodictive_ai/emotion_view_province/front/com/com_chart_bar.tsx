import { listEmotionColor } from "@/assets/list_emotion_color";
import { EChartsOption } from "echarts";
import EChartsReact from "echarts-for-react";
import _ from "lodash";
import useTranslate from 'next-translate/useTranslation'

export const ComChartBar = ({ lsData }: { lsData: any }) => {
  const { t, lang } = useTranslate();
  const option: EChartsOption = {
    radiusAxis: {},
    polar: {},
    angleAxis: {
      type: "category",
      // data: !lsData ? [] : _.keys(lsData),
      data: !lsData ? [] : [t('common:trust'), t('common:joy'), t('common:surprise'), t('common:anticipation'), t('common:sadness'), t('common:fear'), t('common:anger'), t('common:disgust')],
      startAngle: 75,
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
        data: !lsData
          ? []
          : Object.keys(lsData).map(
            (v) =>
            ({
              name: _.lowerCase(t('common:' + v)),
              value: lsData[v],
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
      <EChartsReact
        style={{
          width: "100%",
        }}
        option={option}
      />
    </>
  );
};
