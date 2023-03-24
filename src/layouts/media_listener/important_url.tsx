import { gSelectedView } from "@/g_state/g_dasboard";
import { ModelB24ImportantUrl } from "@/model/media_listener/important_url";
import { Paper, Stack, Text, Title } from "@mantine/core"
import { useShallowEffect } from "@mantine/hooks";
import { EChartsOption } from "echarts";
import EChartsReact from "echarts-for-react";
import { useState } from "react";
import PageTitle from "../page_title";

const ImportantUrl = () => {
    const [datanya, setDatanya] = useState<ModelB24ImportantUrl>();
    useShallowEffect(() => {
      loadData();
    }, []);
  
    const loadData = async () => {
      const res = await fetch("/api/b24/b24-api?get=important-url");
      if (res.status == 200) {
        const data = await res.json();
        setDatanya(data[0].data);
      }
    };
  
    const option: EChartsOption = {
      title: {
        text: "Referer of a Website",
        // subtext: 'Fake Data',
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "right",
      },
      series: [
        {
          name: "Access From",
          type: "pie",
          radius: "50%",
          data:
            datanya &&
            datanya["most_important_urls"]!.map((v) => ({
              name: v.host,
              value: v.host_traffic_visits,
            })),
          // [
          //   { value: 1048, name: 'Search Engine' },
          //   { value: 735, name: 'Direct' },
          //   { value: 580, name: 'Email' },
          //   { value: 484, name: 'Union Ads' },
          //   { value: 300, name: 'Video Ads' }
          // ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };

    if(gSelectedView.value != "Important Url") return <>{gSelectedView.value}</>
  
    return (
      <>
        <Stack>
          {/* <Title order={3}>Important Url</Title> */}
          <PageTitle/>
          <Paper p={"md"}>
            <EChartsReact option={option} />
          </Paper>
        </Stack>
      </>
    );
  };

export default ImportantUrl