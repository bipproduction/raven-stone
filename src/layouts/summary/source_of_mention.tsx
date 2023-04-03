// import { gSelectedView } from "@/g_state/g_selected_view";
import { gListSourceOfMention } from "@/g_state/g_source_of_mention";
import { sSelectedView } from "@/s_state/s_selected_view";
import { Box, Paper, Text } from "@mantine/core";
import { EChartsOption } from "echarts";
import ReactEchart from "echarts-for-react";
import { IconBase } from "react-icons/lib";
import PageTitle from "../page_title";

const listColor = [
  "green",
  "blue",
  "red",
  "orange",
  "yellow",
  "purple",
  "purple",
  "teal",
  "green",
];

const cssKotak = `
.904_9991 { 
	overflow:hidden;
}
.e904_9991 { 
	width:45px;
	height:21px;
	position:absolute;
}
.e904_9990 { 
	background-image:linear-gradient(0deg, rgba(51.00000075995922, 156.00000590085983, 189.00000393390656, 1) 0%,rgba(50.99999696016312, 189.00000393390656, 122.75999754667282, 1) 100%) ;
	width:45px;
	height:21px;
	position:absolute;
	left:0px;
	top:0px;
	border-top-left-radius:4px;
	border-top-right-radius:4px;
	border-bottom-left-radius:4px;
	border-bottom-right-radius:4px;
}
.e904_9989 { 
	color:rgba(255, 255, 255, 1);
	width:17px;
	height:15px;
	position:absolute;
	left:14px;
	top:3px;
	font-family:Inter;
	text-align:left;
	font-size:12px;
	letter-spacing:0;
}
`;

const SourceOfmention = () => {
  if (sSelectedView.value != "Source of Mention")
    return <>{sSelectedView.value}</>;
  const option: EChartsOption = {
    // title: {
    //   text: "World Population",
    // },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    // legend: {},
    // grid: {
    //   left: "3%",
    //   right: "4%",
    //   bottom: "3%",
    //   containLabel: true,
    // },
    xAxis: {
      type: "value",
      boundaryGap: [0, 0.01],
    },
    yAxis: {
      type: "category",
      data: gListSourceOfMention.value.map((v) => v.media),
      axisLabel: {
        rich: {
          Blogs: {
            height: 40,
            align: "center",
            backgroundColor:
              "https://img.freepik.com/free-icon/blogging_318-883190.jpg",
          },
        },
      },
    },
    series: [
      {
        name: "2011",
        type: "bar",
        data: gListSourceOfMention.value.map((v, i) => ({
          value: v.value,
          indicator: v.indicator,
          itemStyle: {
            color: listColor[i],
          },
        })),
        label: {
          show: true,
          align: "left",
          position: "outside",
          formatter: (a: any) => {
            return "+ " + a.data.indicator + "%";
          },
        },
      },
    ],
  };
  return (
    <>
      {/* <Text>Source of Mention</Text> */}
      <PageTitle text="Prediksi sumber perbincangan terhadap konteks pilpres, pemilihan presiden, pemilu, pemilihan umum, capres, calon presiden, etc." />
      <Paper p={"md"}>
        <ReactEchart
          style={{
            height: 600,
          }}
          option={option}
        />
      </Paper>
    </>
  );
};

export default SourceOfmention;
