import {
  Box,
  Card,
  Center,
  Divider,
  Flex,
  Image,
  Loader,
  Paper,
  SimpleGrid,
  Stack,
  Title,
} from "@mantine/core";
import PageTitle from "../page_title";
import { useShallowEffect } from "@mantine/hooks";
import { api } from "@/lib/api";
import { atom, useAtom } from "jotai";
import { fun_componen_access_upsert } from "../dev_dashboard/component_access/fun/fun_upsert";
import useTranslate from "next-translate/useTranslation";
import Trs from "@/fun_load/trs";
import _ from "lodash";
import PageSubTitle from "@/global/components/PageSubTitle";
import EChartsReact from "echarts-for-react";
import { EChartsOption } from "echarts";
import { useState } from "react";

const _val_list_top_5_winning_rate = atom<any[] | undefined>(undefined);

/**
 *
 * @returns Top 5 Rate > SUCCESS PROBABILITY PROJECTION (TOP 5)
 */
export function Top5WinningRate() {
  const { t, lang } = useTranslate();
  const [listTop5, setTop5] = useAtom(_val_list_top_5_winning_rate);
  useShallowEffect(() => {
    fetch(api.apiSummaryTop5WinningRate)
      .then((v) => v.json())
      .then(setTop5);
  }, []);

  // useShallowEffect(() => {
  //   fun_componen_access_upsert({
  //     data: {
  //       name: Top5WinningRate.name,
  //     },
  //   });
  // }, []);

  // EChart option

  const [test, setTest] = useState(false);

  const option: (dataNya: any[]) => EChartsOption = (dataNya: any[]) => {
    return {
      xAxis: {
        type: "value",
        max: 60,
        show: true,
        splitLine: {
          lineStyle: {
            color: "#31247c",
            opacity: 0.5,
          },
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "#31247c",
          },
        },
        axisLabel: {
          color: "white",
          formatter: (v: any) => {
            return `${v} %`;
          },
        },
      },
      yAxis: {
        type: "category",
        data: dataNya.map((v) => ({
          value: v.candidate1.name + "\n" + v.candidate2.name,
        })),
        splitLine: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            color: "#31247c",
          },
        },
        axisLabel: {
          color: "white",
        },
      },
      series: [
        {
          data: dataNya.map((v) => ({
            value: v.persen,
            label: {
              align: "right",
              offset: [-30, 0],
              borderRadius: [10,3,11,22],
              backgroundColor: {
                image: !test
                  ? v.candidate1.img
                  : "https://avenuesrecruiting.com/wp-content/uploads/2016/12/candidate-icon-300x300.png",
              },
              height: 50,
              width: 50,
              show: true,
              position: "right",
              formatter: function (a: any) {
                return "{b|}";
              },
              rich: {
                b: {
                  // backgroundColor: 'https://cdn-icons-png.flaticon.com/512/5363/5363451.png',
                  verticalAlign: "bottom",
                  baseline: "bottom",
                  color: "#fff",
                  fontSize: 42,
                  fontWeight: "bold",
                  align: "right",
                },
              },
            },
          })),
          type: "bar",
          stack: "a",

          itemStyle: {
            borderRadius: 10,
            color: {
              type: "pattern",
              x: 0,
              y: 0.9,
              r: 3,
              colorStops: [
                {
                  offset: 0,
                  color: "#6BBB45", // color at 0% position
                },
                {
                  offset: 0.3,
                  color: "#77613B", // color at 100% position
                },
                {
                  offset: 0.8,
                  color: "#4B182F", // color at 100% position
                },
              ],
              global: false,

              // image:
              // "https://static.vecteezy.com/system/resources/thumbnails/008/854/270/original/abstract-colorful-gradient-animation-background-free-video.jpg",
              // "../bar-chart.png",
            },
          
          },
          emphasis: {
            disabled: true,
          },
        },
        {
          name: "apa",
          type: "bar",
          data: dataNya.map((v) => ({
            name: "2",
            value: 2,
            label: {
              offset: [-80, 0],
              height: 50,
              width: 50,
              show: true,
              position: "right",
              backgroundColor: {
                image: !test
                  ? v.candidate2.img
                  : "https://avenuesrecruiting.com/wp-content/uploads/2016/12/candidate-icon-300x300.png",
              },
              formatter: function (a: any) {
                return "";
              },
            },
          })),
          stack: "a",
          color: "none",
          itemStyle: {},
          emphasis: {
            disabled: false,
          },
        },
        {
          name: "apa",
          type: "bar",
          data: dataNya.map((v) => ({
            name: v.persen,
            value: 15,
            label: {
              fontWeight: "bold",
              show: true,
              fontSize: 40,
              color: "green",
              formatter: function (a: any) {
                return a.name + " %";
              },
            },
          })),
          stack: "a",
          color: "none",

          itemStyle: {
            // opacity: 0
          },
          emphasis: {
            disabled: true,
          },
        },
      ],
    };
  };

  let [dataku, setDataku] = useState<any>();

  if (test) {
    dataku = sampleData();
  }

  if (!listTop5)
    return (
      <>
        <Center>
          <Loader />
        </Center>
      </>
    );

  return (
    <>
    
      {/* <pre>
        {JSON.stringify(
          listTop5.map((e) => e.persen),
          null,
          2
        )}
      </pre> */}
      
      <PageSubTitle text1={t('common:p_success_probability')} text2={t('common:p_projection')} />

      <Box>
        <EChartsReact
          style={{
            height: 500,
          }}
          option={option(sampleData() as any)}
        />
      </Box>

      {/* <Paper p={"md"}>
        <Stack px={"lg"}>
          <SimpleGrid cols={3}>
            {listTop5.map((v, i) => (
              <Card key={i} shadow="md">
                <Stack spacing={"lg"} align="center" justify="center">
                  <Stack key={i} align="center" justify="center">
                    <SimpleGrid cols={2}>
                      <Center>
                        <Stack align="center" justify="center" spacing={"lg"}>
                          <Image
                            radius={8}
                            width={100}
                            height={100}
                            src={v.candidate1.img}
                            alt={""}
                          />
                          <Title align="center" lineClamp={1} order={5}>
                            {v.candidate1.name}
                          </Title>
                        </Stack>
                      </Center>
                      <Center>
                        <Stack align="center" justify="center" spacing={"lg"}>
                          <Image
                            radius={8}
                            width={100}
                            height={100}
                            src={v.candidate2.img}
                            alt={""}
                          />
                          <Title align="center" lineClamp={1} order={5}>
                            {v.candidate2.name}
                          </Title>
                        </Stack>
                      </Center>
                    </SimpleGrid>
                  </Stack>
                  <Divider w={"100%"} />
                  <Title c={"green"} size={72} align="center">
                    {v.persen} %
                  </Title>
                </Stack>
              </Card>
            ))}
          </SimpleGrid>
        </Stack>
      </Paper> */}
    </>
  );
}

function sampleData() {
  return [
    {
      id: 14641,
      date: "2023-09-19T00:00:00.000Z",
      time: null,
      createdAt: "2023-09-19T02:34:14.160Z",
      updatedAt: "2023-09-19T02:34:14.160Z",
      cityId: null,
      persen: 49.89,
      candidate1: {
        id: 2,
        name: "Ganjar Pranowo",
        img: "/candidate/ganjar_circle.png",
      },
      candidate2: {
        id: 1,
        name: "Prabowo Subianto",
        img: "/candidate/prabowo_circle.png",
      },
    },
    {
      id: 14631,
      date: "2023-09-19T00:00:00.000Z",
      time: null,
      createdAt: "2023-09-19T02:34:14.160Z",
      updatedAt: "2023-09-19T02:34:14.160Z",
      cityId: null,
      persen: 49.86,
      candidate1: {
        id: 1,
        name: "Prabowo Subianto",
        img: "/candidate/prabowo_circle.png",
      },
      candidate2: {
        id: 2,
        name: "Ganjar Pranowo",
        img: "/candidate/ganjar_circle.png",
      },
    },
    {
      id: 14637,
      date: "2023-09-19T00:00:00.000Z",
      time: null,
      createdAt: "2023-09-19T02:34:14.160Z",
      updatedAt: "2023-09-19T02:34:14.160Z",
      cityId: null,
      persen: 46.28,
      candidate1: {
        id: 1,
        name: "Prabowo Subianto",
        img: "/candidate/prabowo_circle.png",
      },
      candidate2: {
        id: 8,
        name: "Mahfud MD",
        img: "/candidate/mahfud_circle.png",
      },
    },
    {
      id: 14647,
      date: "2023-09-19T00:00:00.000Z",
      time: null,
      createdAt: "2023-09-19T02:34:14.160Z",
      updatedAt: "2023-09-19T02:34:14.160Z",
      cityId: null,
      persen: 43.65,
      candidate1: {
        id: 2,
        name: "Ganjar Pranowo",
        img: "/candidate/ganjar_circle.png",
      },
      candidate2: {
        id: 8,
        name: "Mahfud MD",
        img: "/candidate/mahfud_circle.png",
      },
    },
    {
      id: 14646,
      date: "2023-09-19T00:00:00.000Z",
      time: null,
      createdAt: "2023-09-19T02:34:14.160Z",
      updatedAt: "2023-09-19T02:34:14.160Z",
      cityId: null,
      persen: 42.45,
      candidate1: {
        id: 2,
        name: "Ganjar Pranowo",
        img: "/candidate/ganjar_circle.png",
      },
      candidate2: {
        id: 7,
        name: "Erick Thohir",
        img: "/candidate/eric_circle.png",
      },
    },
  ];
}
