// import { gSelectedView } from "@/g_state/g_selected_view";
// import { gListNationWideChahrt } from "@/g_state/g_nation_wide_chart";
import { sListNationWideChahrt } from "@/s_state/s_list_nation_wide_chart";
import { useHookstate } from "@hookstate/core";
import { Paper, Space, Text, Title } from "@mantine/core";
import { EChartsOption } from "echarts";
import EChartsReact from "echarts-for-react";
import _ from "lodash";
import moment from "moment";
import PageTitle from "../page_title";

const NationWideChart = () => {
  // const listNationWideNation = useHookstate(sListNationWideChahrt);

  const option: EChartsOption = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 100,
      },
    ],
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: sListNationWideChahrt.value.map((v) =>
          moment(v.date).format("YYYY-MM-DD")
        ),
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Positive",
        type: "line",
        emphasis: {
          focus: "series",
        },
        itemStyle: {
          color: "green",
        },
        smooth: false,
        data: sListNationWideChahrt.value.map((v) => v.positive),
      },
      {
        name: "Negative",
        type: "line",
        emphasis: {
          focus: "series",
        },
        smooth: false,
        itemStyle: {
          color: "red",
        },
        data: sListNationWideChahrt.value.map((v) => v.negative),
      },
      {
        name: "Neutral",
        type: "line",
        emphasis: {
          focus: "series",
        },
        smooth: false,
        itemStyle: {
          color: "orange",
        },
        data: sListNationWideChahrt.value.map((v) => v.neutral),
      },
    ],
  };
  return (
    <>
      {/* <Title c={"cyan.8"} size={24}>
        {_.upperCase(gSelectedView.value)}
      </Title> */}
      <PageTitle />
      <Space h={70} />
      <Paper p={"md"}>
        <EChartsReact
          style={{
            height: 500,
          }}
          option={option}
        />
      </Paper>
    </>
  );
};

export default NationWideChart;
