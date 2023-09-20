import { api } from "@/lib/api";
import { sListDataPredictiveAiCouple } from "@/s_state/s_list_data_predictive_ai_couple";
import { sSelectedCandidate } from "@/s_state/s_selected_candidate";
import { stylesRadial } from "@/styles/styles_radial";
import {
  Box,
  Button,
  Divider,
  Group,
  Loader,
  Menu,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { MenuTarget } from "@mantine/core/lib/Menu/MenuTarget/MenuTarget";
import { DatePicker } from "@mantine/dates";
import { useShallowEffect } from "@mantine/hooks";
import { signal } from "@preact/signals-react";
import { IconHourglassEmpty } from "@tabler/icons-react";
import { EChartsOption, graphic } from "echarts";
import EChartsReact from "echarts-for-react";
import _ from "lodash";
import moment from "moment";
import toast from "react-simple-toasts";
import useTranslate from "next-translate/useTranslation";
import { useState } from "react";
import { atom, useAtom } from "jotai";

const sDateStart = signal(moment(new Date("2023-03-16")).format("YYYY-MM-DD"));
const sDateEnd = signal(moment(new Date()).format("YYYY-MM-DD"));
const slistDataTrenSentiment = signal<any[] | null>(null);
const sShowDateOkButton = signal(false);
const sShowPopDate = signal(false);
const sSelectedDateType = signal("2");

export const vListData = atom<any[] | null>(null)

export function SummaryTrenSentiment({ id }: { id: any }) {
  const [listData, setListData] = useState<any[] | null>(null)
  const [dateType, setDateType] = useState("2");

  useShallowEffect(() => {
    setDateType("2")
    sSelectedCandidate.subscribe(() => {
      // console.log(dateType);
      if (dateType == "1") {
        weekSelected();
      } else if (dateType == "2") {
        montSelected();
      } else if (dateType == "3") {
        customSelected();
      }
    });
  }, []);

  async function customSelected() {
    // sSelectedDateType.value = "3";
    setDateType("3")
    if (!_.isUndefined(id) && !_.isNaN(id)) {
      fetch(
        api.apiSummarySummaryTrenSentiment +
        `?start=${sDateStart.value}&end=${sDateEnd.value}&candidateId=${id}`
      ).then(async (v) => {
        if (v.status == 200) {
          const data = await v.json();
          if (_.isEmpty(data)) return toast("empty data");
          // if (!data) return (slistDataTrenSentiment.value = []);
          // slistDataTrenSentiment.value = data;
          if (!data) return (setListData([]));
          setListData(data);
          sShowPopDate.value = false;
        }
      });
    }
  }

  function weekSelected() {
    const end = moment(new Date()).format("YYYY-MM-DD");
    const start = moment(new Date()).subtract(7, "days").format("YYYY-MM-DD");
    // sSelectedDateType.value = "1";
    setDateType("1")
    if (!_.isUndefined(id) && !_.isNaN(id)) {
      fetch(
        api.apiSummarySummaryTrenSentiment +
        `?start=${start}&end=${end}&candidateId=${id}`
      ).then(async (v) => {
        if (v.status == 200) {
          const data = await v.json();
          if (_.isEmpty(data)) return toast("empty data");
          // if (!data) return (slistDataTrenSentiment.value = []);
          // slistDataTrenSentiment.value = data;
          if (!data) return (setListData([]));
          setListData(data);
        }
      });
    }
  }

  function montSelected() {
    // sSelectedDateType.value = "2";
    setDateType("2")
    const end = moment(new Date()).format("YYYY-MM-DD");
    const start = moment(new Date()).subtract(1, "months").format("YYYY-MM-DD");
    if (!_.isUndefined(id) && !_.isNaN(id)) {
      fetch(
        api.apiSummarySummaryTrenSentiment +
        `?start=${start}&end=${end}&candidateId=${id}`
      ).then(async (v) => {
        if (v.status == 200) {
          const data = await v.json();
          if (_.isEmpty(data)) return toast("empty data");
          // if (!data) return (slistDataTrenSentiment.value = []);
          // slistDataTrenSentiment.value = data;
          if (!data) return (setListData([]));
          setListData(data);
        }
      });
    }
  }
  const { t, lang } = useTranslate();

  return (
    <>
      <Stack w={"100%"}>
        {/* <Title order={3}>Tren Sentiment</Title> */}
        <Box>
          <Group position="right">
            <Button
              bg={dateType == "1" ? "indigo.1" : ""}
              onClick={weekSelected}
              w={150}
              radius={"xl"}
              sx={{ border: "none" }}
              variant="outline"
              c={dateType == "1" ? "black" : "white"}
            >
              {t("common:week")}
            </Button>
            <Divider orientation="vertical" color="white" />
            <Button
              bg={dateType == "2" ? "indigo.1" : ""}
              onClick={montSelected}
              radius={"xl"}
              sx={{ border: "none" }}
              w={150}
              variant="outline"
              c={dateType == "2" ? "black" : "white"}
            >
              {t("common:month")}
            </Button>
            <Divider orientation="vertical" color="white" />
            <Menu opened={sShowPopDate.value}>
              <Menu.Target>
                <Button
                  bg={dateType == "3" ? "indigo.1" : ""}
                  radius={"xl"}
                  sx={{ border: "none" }}
                  w={150}
                  variant="outline"
                  onClick={() => (sShowPopDate.value = true)}
                  c={dateType == "3" ? "black" : "white"}
                >
                  {t("common:custom")}
                </Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Stack w={300} bg={stylesRadial.out_gray} p={"md"}>
                  <Title order={3}>{t("common:custom")}</Title>
                  <DatePicker
                    minDate={new Date("2023-03-16")}
                    maxDate={new Date()}
                    type="range"
                    onChange={(v) => {
                      if (v[0] && v[1]) {
                        const diferent = moment(v[1]).diff(
                          moment(v[0]),
                          "days"
                        );

                        console.log(diferent);
                        if (diferent < 8)
                          return toast(t("common:select_7_days"));
                        sDateStart.value = moment(v[0]).format("YYYY-MM-DD");
                        sDateEnd.value = moment(v[1]).format("YYYY-MM-DD");
                        sShowDateOkButton.value = true;
                      } else {
                        sShowDateOkButton.value = false;
                      }
                    }}
                  />
                  <Group position="apart">
                    <Button
                      onClick={() => (sShowPopDate.value = false)}
                      compact
                      w={100}
                      variant="outline"
                    >
                      {t("common:cancel")}
                    </Button>
                    {sShowDateOkButton.value && (
                      <Button
                        onClick={customSelected}
                        compact
                        w={100}
                        variant="light"
                      >
                        ok
                      </Button>
                    )}
                  </Group>
                </Stack>
              </Menu.Dropdown>
            </Menu>
          </Group>
          <ChartItem />
        </Box>
        {/* {JSON.stringify(slistDataTrenSentiment.value)} */}
      </Stack>
    </>
  );

  function ChartItem() {
    const { t, lang } = useTranslate();
    const option: EChartsOption = {
      title: {
        // text: "Tren Sentiment",
        // text: t("common:tren_sentiment"),
      },
      tooltip: {
        trigger: "axis",
        // axisPointer: {
        //   type: "cross",
        //   label: {
        //     backgroundColor: "#6a7985",
        //   },
        // },
        formatter: (a: any, b: any) => {
          return `
          <div style="width: 300px; word-break: break-all; background-color: lightblue; padding: 10px">
              <h5 >${moment(a[0].name).format("DD/MM/YY")}</h5>
              <div>
                  <div>
                      <h3 style="color: green">${a[0].data} %</h3>
                      <div>${_.upperCase(t("common:positive"))}</div>
                  </div>
                  <div>
                      <h3 style="color: red">${a[1].data} %</h3>
                      <div>${_.upperCase(t("common:negative"))}</div>
                  </div>
                  <div>
                      <h3 style="color: gray">${a[2].data} %</h3>
                      <div>${_.upperCase(t("common:neutral"))}</div>
                  </div>
              </div>
          </div>
          `;
        },
      },
      // legend: {
      //   data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
      // },
      // toolbox: {
      //   feature: {
      //     saveAsImage: {},
      //   },
      // },
      // grid: {
      //   left: "3%",
      //   right: "4%",
      //   bottom: "3%",
      //   containLabel: true,
      // },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          axisLabel: { interval: 2, rotate: 30 },
          axisLine: {
            lineStyle: {
              color: "white",
            },
          },
          // minorSplitLine: {
          //   show: true,
          // },
          // min: -60,
          // max: 20,
          data: !listData
            ? []
            : listData!.map((v) => v.date),
        },
      ],
      yAxis: {
        type: "value",
        max: "100",
        axisLabel: {
          formatter: `{value} % `,
        },

        axisLine: {
          show: true,
          onZero: false,
          lineStyle: {
            color: "white",
          },
        },
      },

      series: [
        {
          name: t("common:positive"),
          type: "line",
          // symbol: "none",
          sampling: "lttb",
          itemStyle: {
            color: "#7DFF7A",
            // color: "white",
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
          data: !listData
            ? []
            : listData!.map((v) => v.positive),
        },
        {
          name: t("common:negative"),
          type: "line",
          // symbol: "none",
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
          data: !listData
            ? []
            : listData!.map((v) => v.negative),
        },
        {
          name: t("common:neutral"),
          type: "line",
          // symbol: "none",
          sampling: "lttb",
          itemStyle: {
            color: "#868686",
          },
          areaStyle: {
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#868686",
              },
              {
                offset: 1,
                color: "rgba(136, 136, 136, 0)",
              },
            ]),
          },
          data: !listData
            ? []
            : listData!.map((v) => v.neutral),
        },
      ],
    };

    if (listData == null)
      return (
        <>
        aa
          <Loader />
        </>
      );

    if (_.isEmpty(listData))
      return (
        <>
          <IconHourglassEmpty />
        </>
      );
    return (
      <>
        {/* {JSON.stringify(slistDataTrenSentiment.value.map((v) => v.date))} */}
        <EChartsReact option={option} />
      </>
    );
  }
}


