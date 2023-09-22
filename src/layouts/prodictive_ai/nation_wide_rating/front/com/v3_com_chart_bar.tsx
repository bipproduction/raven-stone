import { listEmotionColor } from "@/assets/list_emotion_color";
import { Box, Center, Container, Group, Paper } from "@mantine/core";
import { EChartsOption } from "echarts";
import EChartsReact from "echarts-for-react";
import { useAtom } from "jotai";
import _ from "lodash";
import { v3_val_data_line_chart } from "../../val/v3_val_data_line_chart";
import { v3_val_nation_wide_rating_list_data } from "../../val/v3_nation_wide_rating_list_data";
import useTranslate from "next-translate/useTranslation";
import { listColorChart } from "@/global/fun/color_chart";

export function V3ComChartBar() {
  const [listData, setListData] = useAtom(v3_val_nation_wide_rating_list_data);
  const { t, lang } = useTranslate();

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
        t("common:trust"),
        t("common:joy"),
        t("common:surprise"),
        t("common:anticipation"),
        t("common:sadness"),
        t("common:fear"),
        t("common:anger"),
        t("common:disgust"),
      ],

      axisLabel: {
        verticalAlign: "middle",
        rotate: 45,
      },
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
                "text",
                "rate",
                "date",
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

  const optionPie: EChartsOption = {
    legend: {
      textStyle: {
        color: "white",
      },
      show: true,
      bottom: "0%",
    right: "0%",
    width: "24%",
    top: "25%",
    orient: "vertical",
    height: "61%",
    align: "auto",
    padding: [0, -0, 0, 0],
    itemWidth: 25.5,
    itemGap: 13.5
      // itemGap: 15,
      // itemWidth: 30,
      // itemHeight: 10,
      // padding: [0, 5, 0, 0],
      // data: (_.keys(_.omit(listData![0],[
      //   "id",
      //   "candidate1Id",
      //   "candidate2Id",
      //   "updatedAt",
      //   "createdAt",
      //   "time",
      //   "cityId",
      //   "text",
      //   "rate",
      //   "date",
      // ]))).map((e) => t(`common: ${e}`))

      // data:
      // t(`common: trust,
      // joy,
      // surprise,
      // anticipation,
      // sadness,
      // fear,
      // anger,
      // disgust`),
    },
    series: {
      name: "Pie Chart",

      type: "pie",
      radius: "60%",
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
              "text",
              "rate",
              "date",
            ])
          )
            .map((v) => ({
              name: v,
              value: listData![0][v],
            }))
            .map((v) => ({
              value: v.value,
              name: t("common:" + v.name),
              itemStyle: {

                color: listColorChart.find(
                  (c) => _.lowerCase(c.name) == _.lowerCase(v.name)
                )?.color,
              },
            })) as any),

      labelLine: {
        show: false,
      },
      label: {
        position: "inner",
        formatter: (a) => {
          // return `${a.value}` + "%";
          return `${a.value + "%"}`;
        },
      },
    },
  };

  return (
    <>
      {/* <pre>
        {JSON.stringify(
          _.keys(
            _.omit(listData![0], [
              "id",
              "candidate1Id",
              "candidate2Id",
              "updatedAt",
              "createdAt",
              "time",
              "cityId",
              "text",
              "rate",
              "date",
            ])
          ),
          null,
          2
        )}
      </pre> */}
      {/* <Paper p={"xs"}>
        {JSON.stringify(_.omit(listData![0], [
                "id",
                "candidate1Id",
                "candidate2Id",
                "updatedAt",
                "createdAt",
                "time",
                "cityId",
                "text",
                "rate",
                "date"
              ]))}
        <EChartsReact
          style={{
            height: 460,
            margin: 0,
          }}
          option={option}
        />
      </Paper> */}
      <Box
        // style={{
        //   minHeight: 400,
        //   minWidth: 500,
        //   // backgroundColor: "gray",

        //   // paddingRight: 150,
        //   marginLeft: -100,
        //   marginRight: 50,
        // }}
      >
        <Container size="xs" px="xs">
          <Center>

        <EChartsReact
          style={{
            // backgroundColor: "darkblue",
            height: 400,
            minWidth: 500,

            // maxWidth: 1000,
            // paddingRight: 100,
            // paddingLeft: -10
          }}
          option={optionPie}
        />
          </Center>
        </Container>
      </Box>
    </>
  );
}
