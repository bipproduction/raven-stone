import { Box, Button, Group, Menu, Paper, Stack, Title } from "@mantine/core";
import EChartsReact from "echarts-for-react";
import { EChartsOption, graphic } from "echarts";
import { api } from "@/lib/api";
import { httpDevTimeMachine } from "@/http/http_dev_time_machine";
import { sSelectedCandidate } from "@/s_state/s_selected_candidate";
import { sSelectedDate } from "@/s_state/s_selectedDate";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import { stylesGradient1 } from "@/styles/styles_gradient_1";
import { httpSummaryTimeMachine1DayGet } from "@/http/http_summary_time_machine_1days_get";
import moment from "moment";
import { httpSummaryTimeMachine7DayGet } from "@/http/http_summary_time_machine_7days_get";
import { httpSummaryTimeMachineGetSebulan } from "@/http/http_summary_time_machine_get_sebulan";
import { DatePicker } from "@mantine/dates";
import { styleGradientLinierBlue } from "@/styles/styles_gradient_linear_blue";
import { stylesRadial } from "@/styles/styles_radial";
import { httpSummaryTimeMachineAturTanggalGet } from "@/http/http_summary_time_machine_get_atur_tanggal";
import _ from "lodash";

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
        date: moment(new Date()).format("YYYY-MM-DD"),
      })
      .then((v) => v.json())
      .then((v) => {
        setlistData(v);
      });
  };

  const option: EChartsOption = {
    tooltip: {
      trigger: "axis",
      //   position: function (pt: any) {
      //     return [pt[0], "10%"];
      //   },
      formatter: (a: any, b) => {
        const data = a[0].data.data.sentiment;
        return `
        <div style="width:300px;position: relative">
            <h3>${a[0].data.data.label}</h3>
            <div style="display:inline; float: left; padding: 8px; color:#7DFF7A "><h3>${data.positive}  %</h3> POSITIVE </div>
            <div style="display:inline; float: left; padding: 8px; color:#FF848B"><h3>${data.negative}  %</h3> NEGATIVE </div>
            <div style="display:inline; float: left; padding: 8px; color:#868686"><h3>${data.neutral}  %</h3> NEUTRAL </div>
        </div>`;
      },
    },
    title: {
      left: "center",
      text: "Tren Sentimen",
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: listData?.data
        .map((v: any) => ({
          label: v.label,
          //   value: v.sentiment.positive,
        }))
        .map((v: any) => v.label),
    },
    yAxis: {
      type: "value",
      boundaryGap: [0, "100%"],
      max: 100,
    },
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
          value: v.sentiment.positive,
          data: v,
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
          value: v.sentiment.negative,
        })),
      },
      {
        name: "Neutral",
        type: "line",
        symbol: "none",
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
        data: listData?.data.map((v: any) => ({
          label: v.label,
          value: v.sentiment.neutral,
        })),
      },
    ],
  };

  const on1DayGet = () => {
    httpSummaryTimeMachine1DayGet()
      .then((v) => v.json())
      .then((v) => {
        // console.log(v);
        setlistData(v);
      });
  };

  const on7DayGet = () => {
    httpSummaryTimeMachine7DayGet()
      .then((v) => v.json())
      .then((v) => {
        // console.log(v);
        setlistData(v);
      });
  };

  const onSebulanGet = () => {
    httpSummaryTimeMachineGetSebulan()
      .then((v) => v.json())
      .then((v) => {
        // console.log(v);
        setlistData(v);
      });
  };

  return (
    <>
      <Stack w={"100%"} justify="end" align="end">
        <Paper p={"lg"} w={"100%"} bg={stylesRadial.out_cyan}>
          <Group position="right" spacing={"xs"} p={"xs"}>
            <Button variant="outline" onClick={onLoadData} compact w={100}>
              hari ini
            </Button>
            <Button variant="outline" onClick={on1DayGet} compact w={100}>
              1 hari
            </Button>
            <Button variant="outline" onClick={on7DayGet} compact w={100}>
              7 hari
            </Button>
            <Button variant="outline" onClick={onSebulanGet} compact w={100}>
              1 bulan
            </Button>
            <ButtonPilihTanggal setlistData={setlistData} />
          </Group>
          <EChartsReact style={{ width: "100%" }} option={option} />
        </Paper>
      </Stack>
    </>
  );
};

const ButtonPilihTanggal = ({ setlistData }: { setlistData: any }) => {
  const [open, setOpen] = useDisclosure();
  const [listtanggal, setlistTanggal] = useState<any[]>([]);
  const onSebulan = async (date: any) => {
    if (date && date[0] != null && date[1] != null) {
      setlistTanggal(date);
    }
  };

  const onProccess = () => {
    httpSummaryTimeMachineAturTanggalGet({
      date1: listtanggal[0],
      date2: listtanggal[1],
    })
      .then((v) => v.json())
      .then((v) => {
        setlistData(v);
        setOpen.close();
      });
  };


  return (
    <>
      <Menu opened={open}>
        <Menu.Target>
          <Button variant="outline" onClick={setOpen.toggle} compact w={100}>
            Atur Waktu
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          <Paper bg={stylesRadial.out_gray_dark} p={"xs"}>
            <Stack>
              <DatePicker
                minDate={new Date("2023-03-16")}
                maxDate={new Date()}
                type="range"
                numberOfColumns={2}
                onChange={onSebulan}
              />

              <Group position="right">
                <Button onClick={setOpen.close} compact bg={"orange"} w={100}>
                  cancel
                </Button>
                {!_.isEmpty(listtanggal) && (
                  <Button w={100} onClick={onProccess} compact>
                    Ok
                  </Button>
                )}
              </Group>
            </Stack>
          </Paper>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default SummaryDataChart;
