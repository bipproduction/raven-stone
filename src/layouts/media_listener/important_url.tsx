import { gSelectedView } from "@/g_state/g_selected_view";
import { ModelB24ImportantUrl } from "@/model/media_listener/important_url";
import { stylesGradient1 } from "@/styles/styles_gradient_1";
import { Paper, Stack, Text, Title } from "@mantine/core"
import { useShallowEffect } from "@mantine/hooks";
import { EChartsOption } from "echarts";
import EChartsReact from "echarts-for-react";
import { useState } from "react";
import PageTitle from "../page_title";
import MediaListenerTitle from "./media_listener_title";

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

    // if(gSelectedView.value != "Important Url") return <>{gSelectedView.value}</>
  
    return (
      <>
        <Stack spacing={0}>
          {/* <Title order={3}>Important Url</Title> */}
          {/* <PageTitle text="Sering juga disebut Social Media Monitor, adalah proses mengidentifikasi dan menilai apa yang dibicarakan tentang perusahaan, individu, produk, atau merek di internet secara publik. Percakapan di internet menghasilkan sejumlah data yang besar dan tidak terstruktur."/> */}
          <MediaListenerTitle title="Important Url" />
          <Paper p={"md"} bg={stylesGradient1}>
            <EChartsReact option={option} />
          </Paper>
        </Stack>
      </>
    );
  };

export default ImportantUrl