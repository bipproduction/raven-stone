import { Box, Stack, Title } from "@mantine/core";
import EChartsReact from "echarts-for-react";
import { EChartsOption, graphic } from "echarts";
import { api } from "@/lib/api";
import { httpDevTimeMachine } from "@/http/http_dev_time_machine";
import { sSelectedCandidate } from "@/s_state/s_selected_candidate";
import { sSelectedDate } from "@/s_state/s_selectedDate";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";

const SummaryDataChart = () => {
  const [listData, setlistData] = useState<{ [key: string]: any }>();

  useShallowEffect(() => {
    sSelectedCandidate.subscribe(() => {
      onLoadData();
    });
  }, []);

  const onLoadData = () => {
    httpDevTimeMachine
      .getByDateAndCandidateId({
        candidateId: sSelectedCandidate.value,
        date: sSelectedDate.value,
      })
      .then((v) => v.json())
      .then((v) => {
        setlistData(v);
      });
  };

  const option: EChartsOption = {
    tooltip: {
      trigger: "axis",
      position: function (pt: any) {
        return [pt[0], "10%"];
      },
    },
    title: {
      left: "center",
      text: "Tren Sentimen",
    },
    // toolbox: {
    //   feature: {
    //     dataZoom: {
    //       yAxisIndex: "none",
    //     },
    //     restore: {},
    //     saveAsImage: {},
    //   },
    // },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: listData?.data
        .map((v: any) => ({
          label: v.label,
          value: v.sentiment.positive,
        }))
        .map((v: any) => v.label),
    },
    yAxis: {
      type: "value",
      boundaryGap: [0, "100%"],
      max: 100
    },
    // dataZoom: [
    //   {
    //     type: "inside",
    //     start: 0,
    //     end: 10,
    //   },
    //   {
    //     start: 0,
    //     end: 10,
    //   },
    // ],
    series: [
      {
        name: "Positive",
        type: "line",
        symbol: "none",
        sampling: "lttb",
        itemStyle: {
          color: "#7DFF7A",
        },
        areaStyle: {
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#7DFF7A",
            },
            {
              offset: 1,
              color: "rgba(5, 255, 0, 0)",
            },
          ]),
        },
        data: listData?.data.map((v: any) => ({
          label: v.label,
          value: v.sentiment.negative,
        })),
      },
      {
        name: "Negative",
        type: "line",
        symbol: "none",
        sampling: "lttb",
        itemStyle: {
          color: "#FF848B",
        },
        areaStyle: {
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#FF848B",
            },
            {
              offset: 1,
              color: "rgba(255, 0, 0, 0)",
            },
          ]),
        },
        data: listData?.data.map((v: any) => ({
          label: v.label,
          value: v.sentiment.positive,
        })),
      },
      {
        name: "Neutral",
        type: "line",
        symbol: "none",
        sampling: "lttb",
        itemStyle: {
          color: "#62D3F6",
        },
        areaStyle: {
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#62D3F6",
            },
            {
              offset: 1,
              color: "rgba(136, 136, 136, 0)",
            },
          ]),
        },
        data: listData?.data.map((v: any) => ({
          label: v.label,
          value: v.sentiment.neutral,
        })),
      },
    ],
  };

  return (
    <>
      <Stack w={"100%"}>
        {/* {JSON.stringify(
          listData?.data.map((v: any) => ({
            label: v.label,
            value: v.sentiment.positive,
          }))
        )} */}
        <Box p={"lg"} w={"100%"}>
          <EChartsReact option={option} />
        </Box>
      </Stack>
    </>
  );
};

export default SummaryDataChart;
