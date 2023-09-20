import { listEmotionColor } from "@/assets/list_emotion_color";
import {
  Box,
  Button,
  Card,
  Group,
  HoverCard,
  Menu,
  Paper,
  Stack,
  Title,
  createStyles,
} from "@mantine/core";
import { DateInput, DatePicker, DateTimePicker } from "@mantine/dates";
import { EChartsOption } from "echarts";
import EChartsReact from "echarts-for-react";
import { atom, useAtom } from "jotai";
import _, { subtract } from "lodash";
import moment from "moment";
import { v3_val_nation_wide_rating_selected_date } from "../../val/v3_val_nation_wide_rating_selected_date";
import { api } from "@/lib/api";
import { v3_val_nation_wide_rating_selected_candidate } from "../../val/v3_nation_wide_rating_selected_candidate";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import toast from "react-simple-toasts";
import { v3_fun_load_chart_data } from "../../fun/v3_fun_load_chart_data";
import { v3_val_data_line_chart } from "../../val/v3_val_data_line_chart";
import useTranslate from "next-translate/useTranslation";

type DataChart = {
  trust: string;
  joy: string;
  surprise: string;
  anticipation: string;
  sadness: string;
  fear: string;
  anger: string;
  disgust: string;
  date: string;
};

export function V3ComNationWideRatingLineChart() {
  const [selectedDate, setSelectedDate] = useAtom(
    v3_val_nation_wide_rating_selected_date
  );
  const [selectedCandidate, setSelectedCandidate] = useAtom(
    v3_val_nation_wide_rating_selected_candidate
  );

  const [dataChart, setDataChart] = useAtom(v3_val_data_line_chart);

  // trust
  // joy
  // surprise
  // anticipation
  // sadness
  // fear
  // anger
  // disgust
  // date

  const option: EChartsOption = {
    title: {
      top: 0,
      text: "100 %",
      textStyle: {
        color: "white",
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
      backgroundColor: "orange",
      formatter: (a: any, b: any) => {
        const d: any[] = a;
        return `
        <div style="width: 300px; padding: 10px; ">
          <div style="color: white;font-size: 1rem">${d.map(
            (v) => v.name
          )} </div>
          <div style="color: white; font-size: 2rem">${d.map(
            (v) => v.value
          )} %</div>
        </div>
        `;
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: _.orderBy(dataChart, ["date"], ["asc"]).map((v) =>
        moment(v.date).format("YYYY-MM-DD")
      ),
      // data: [...(_.groupBy(dataChart, "date") as any).map((v: any) => v[0])],
      axisLabel: {
        rotate: 45,
        color: "white",
      },
      axisLine: {
        show: true,
      },
    },
    yAxis: {
      show: true,
      type: "value",
      max: 50,
      // data: ["10", "20", "30", "40", "50", "60", "70", "80", "90", "100"],
      axisLabel: {
        color: "white",
        formatter: (a: any) => {
          return `${a} %`;
        },
      },
    },
    series: [
      {
        data: dataChart.map((v) => ({
          name: moment(v.date).format("YYYY-MM-DD"),
          value: v.rate,
        })),
        name: "trust",
        type: "line",
        itemStyle: {
          color: "yellow",
        },
        areaStyle: {
          color: "green",
        },
        emphasis: {
          focus: "series",
        },
        smooth: true,
        // markLine: {
        //   data: [{
        //     type: "average"
        //   }],
        //   silent: true
        // }
        // itemStyle: {
        //   color: listEmotionColor.find((v) => v.name === "Trust")?.color,
        // },
      },
    ],
    // series: [
    //   {
    //     data: [...dataChart.map((v) => v.trust)],
    //     name: "trust",
    //     type: "line",

    //     areaStyle: {},
    //     emphasis: {
    //       focus: "series",
    //     },
    //     itemStyle: {
    //       color: listEmotionColor.find((v) => v.name === "Trust")?.color,
    //     },
    //   },
    //   {
    //     data: [...dataChart.map((v) => v.joy)],
    //     name: "joy",
    //     type: "line",

    //     areaStyle: {},
    //     emphasis: {
    //       focus: "series",
    //     },
    //     itemStyle: {
    //       color: listEmotionColor.find((v) => v.name === "Joy")?.color,
    //     },
    //   },
    //   {
    //     data: [...dataChart.map((v) => v.surprise)],
    //     name: "surprise",
    //     type: "line",

    //     areaStyle: {},
    //     emphasis: {
    //       focus: "series",
    //     },
    //     itemStyle: {
    //       color: listEmotionColor.find((v) => v.name === "Surprise")?.color,
    //     },
    //   },
    //   {
    //     data: [...dataChart.map((v) => v.anticipation)],
    //     name: "anticipation",
    //     type: "line",

    //     areaStyle: {},
    //     emphasis: {
    //       focus: "series",
    //     },
    //     itemStyle: {
    //       color: listEmotionColor.find((v) => v.name === "Anticipation")?.color,
    //     },
    //   },
    //   {
    //     data: [...dataChart.map((v) => v.sadness)],
    //     name: "sadness",
    //     type: "line",

    //     areaStyle: {},
    //     emphasis: {
    //       focus: "series",
    //     },
    //     itemStyle: {
    //       color: listEmotionColor.find((v) => v.name === "Sadness")?.color,
    //     },
    //   },
    //   {
    //     data: [...dataChart.map((v) => v.fear)],
    //     name: "fear",
    //     type: "line",

    //     areaStyle: {},
    //     emphasis: {
    //       focus: "series",
    //     },
    //     itemStyle: {
    //       color: listEmotionColor.find((v) => v.name === "Fear")?.color,
    //     },
    //   },
    //   {
    //     data: [...dataChart.map((v) => v.anger)],
    //     name: "anger",
    //     type: "line",

    //     areaStyle: {},
    //     emphasis: {
    //       focus: "series",
    //     },
    //     itemStyle: {
    //       color: listEmotionColor.find((v) => v.name === "Anger")?.color,
    //     },
    //   },
    //   {
    //     data: [...dataChart.map((v) => v.disgust)],
    //     name: "disgust",
    //     type: "line",

    //     areaStyle: {},
    //     emphasis: {
    //       focus: "series",
    //     },
    //     itemStyle: {
    //       color: listEmotionColor.find((v) => v.name === "Disgust")?.color,
    //     },
    //   },
    // ],
  };

  useShallowEffect(() => {
    v3_fun_load_chart_data({
      start: moment().subtract(1, "weeks").format("YYYY-MM-DD"),
      end: moment().format("YYYY-MM-DD"),
      selectedCandidate: selectedCandidate,
      setDataChart: setDataChart,
    });
  }, []);

  const { t, lang } = useTranslate();

  const useStyles = createStyles((theme) => ({
    text_calender: {
      color: "white",
      borderRadius: 50,
      borderWidth: 0,
    },
  }));

  const { classes } = useStyles();

  return (
    <>
    {/* {JSON.stringify(dataChart)} */}
      <Box >
        <Stack spacing={0}>
          {/* {JSON.stringify(dataChart)} */}
          {/* <Title order={3}>Nation Wide Rating Line Chart</Title> */}

          <Box>
            <Group position="right" >
              <Button
                className={classes.text_calender}
                variant="subtle"
                onClick={() => {
                  const dates = {
                    start: moment().subtract(1, "weeks").format("YYYY-MM-DD"),
                    end: moment().format("YYYY-MM-DD"),
                  };
                  setSelectedDate(dates);
                  v3_fun_load_chart_data({
                    start: dates.start,
                    end: dates.end,
                    selectedCandidate: selectedCandidate,
                    setDataChart: setDataChart,
                  });
                }}
              >
                {t("common:week")}
              </Button>
              <Button
                className={classes.text_calender}
                variant="outline"
                onClick={() => {
                  const dates = {
                    start: moment().subtract(1, "months").format("YYYY-MM-DD"),
                    end: moment().format("YYYY-MM-DD"),
                  };
                  setSelectedDate(dates);
                  v3_fun_load_chart_data({
                    start: dates.start,
                    end: dates.end,
                    selectedCandidate: selectedCandidate,
                    setDataChart: setDataChart,
                  });
                }}
              >
                {t("common:month")}
              </Button>
              <HoverCard>
                <HoverCard.Target>
                  <Button className={classes.text_calender} variant="outline">
                    {t("common:custom")}
                  </Button>
                </HoverCard.Target>
                <HoverCard.Dropdown>
                  <Stack>
                    <DatePicker
                      type="range"
                      numberOfColumns={2}
                      onChange={(val) => {
                        if (val[0] && val[1]) {
                          const dates = {
                            start: moment(val[0]).format("YYYY-MM-DD"),
                            end: moment(val[1]).format("YYYY-MM-DD"),
                          };

                          setSelectedDate(dates);
                          v3_fun_load_chart_data({
                            start: dates.start,
                            end: dates.end,
                            selectedCandidate: selectedCandidate,
                            setDataChart: setDataChart,
                          });
                        }
                      }}
                    />
                  </Stack>
                </HoverCard.Dropdown>
              </HoverCard>
            </Group>
          </Box>
          {/* {JSON.stringify(dataChart.map((a) => a.trust))} */}
         <Box >
         <EChartsReact
            style={{
              height: 310,
              
            }}
            option={option}
          />
         </Box>
        </Stack>
      </Box>
    </>
  );
}
