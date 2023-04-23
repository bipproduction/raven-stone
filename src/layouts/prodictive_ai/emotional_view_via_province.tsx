import { listEmotionColor } from "@/assets/list_emotion_color";
import { funcLoadEmotionalViwViaProvinceByDate } from "@/fun_load/func_load_emotion_view_via_province";
// import { gCandidate } from "@/g_state/g_candidate";
// import { gCityContextDirection } from "@/g_state/g_city_context_direction";
// import { gSelectedDate } from "@/g_state/g_map_state";
// import { gSelectedProvince } from "@/g_state/g_selected_province";
// import { gSelectedView } from "@/g_state/g_selected_view";
// import { gSelectedCandidate1 } from "@/g_state/nation_wide_rating/g_selected_candidate1";
import { gEmotionalViewViaProvince } from "@/g_state/predictive_ai/g_emotional_view_via_province";
import { api } from "@/lib/api";
import { ModelDataKabupaten } from "@/model/model_data_kabupaten";
import { ModelEmotionalViewViaProvinceCity } from "@/model/predictive_ai/model_emotional_view_via_province_city";
import { listAnimation } from "@/styles/styles_animation";
import { stylesGradient1 } from "@/styles/styles_gradient_1";
import { sCandidate } from "@/s_state/s_candidate";
import { sCityContextDirection } from "@/s_state/s_city_ontext_irection";
import { sSelectedDate } from "@/s_state/s_selectedDate";
import { sSelectedCandidate1 } from "@/s_state/s_selected_candidate1";
import { sSelectedProvince } from "@/s_state/s_selected_province";
import { sSelectedView } from "@/s_state/s_selected_view";
// import { sCityContextDirection } from "@/s_state/s_state_city_context_direction";
import {
  Box,
  Button,
  Flex,
  Group,
  Modal,
  Paper,
  Select,
  SimpleGrid,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
  Tooltip,
} from "@mantine/core";
import {
  useDisclosure,
  useForceUpdate,
  useShallowEffect,
} from "@mantine/hooks";
import { EChartsOption } from "echarts";
import EChartsReact from "echarts-for-react";
import _ from "lodash";
import { useState } from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { MdSearch } from "react-icons/md";
import PageTitle from "../page_title";
import colors from "randomcolor";
import { stylesRadial } from "@/styles/styles_radial";

const EmotionItemChart = ({ lsData }: { [key: string]: any }) => {
  const option: EChartsOption = {
    radiusAxis: {},
    polar: {},
    angleAxis: {
      type: "category",
      data: Object.keys(lsData),
      startAngle: 75,
    },
    tooltip: {
      show: true,
      formatter: (a: any, b) => {
        return `
        <i>${_.upperCase(a.data.name)}</i>
        <h1>${Intl.NumberFormat("id-ID").format(a.value)}</h1>`;
      },
    },
    series: [
      {
        type: "bar",
        coordinateSystem: "polar",
        data: Object.keys(lsData).map(
          (v) =>
            ({
              name: v,
              value: lsData[v],
              itemStyle: {
                color:
                  listEmotionColor.find((v2) => _.lowerCase(v2.name) == v)
                    ?.color ?? "gray",
              },
            } as any)
        ),
        itemStyle: {
          shadowBlur: 20,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
        barWidth: 80,
      },
    ],
  };
  return (
    <>
      <EChartsReact option={option} />
    </>
  );
};

const EmotionalViewViaProvince = () => {
  const [openDetain, setOpenDetail] = useDisclosure(false);
  const update = useForceUpdate();
  const [search, setSearch] = useState("");

  if (sSelectedView.value != "Emotional View Via Province")
    return <>${sSelectedView.value}</>;
  return (
    <>
      {/* <Text size={32} fw={"bold"} color={"cyan.8"}>
        {_.upperCase(gSelectedView.value)}
      </Text> */}
      {/* {JSON.stringify(gEmotionalViewViaProvince.value[0])} */}
      <PageTitle text="EMOTIONAL METERS BRAND MERGER SIMULATION" />
      <Paper
        bg={"blue.1"}
        shadow={"md"}
        pos={"sticky"}
        p={"xs"}
        sx={{
          zIndex: 100,
        }}
        top={50}
        mb={70}
      >
        <Group position="right">
          <TextInput
            radius={100}
            variant="filled"
            placeholder="search"
            onChange={(val) => setSearch(val.currentTarget.value)}
            icon={<MdSearch />}
          />
          <Select
            radius={100}
            shadow="md"
            variant="filled"
            placeholder={
              sCandidate.value.find((v) => v.id == sSelectedCandidate1.value)
                ?.name
            }
            data={
              sCandidate.value.map((v) => ({
                label: v.name,
                value: v.id,
              })) as any
            }
            onChange={async (val) => {
              // gSelectedCandidate1.set(Number(val));
              sSelectedCandidate1.value = Number(val);
              await funcLoadEmotionalViwViaProvinceByDate();
              update();
            }}
          />
        </Group>
      </Paper>
      <Group position="center">
        {gEmotionalViewViaProvince.value
          .filter((v) => _.lowerCase(v.name).includes(_.lowerCase(search)))
          .map((v: any) => (
            <AnimationOnScroll
              key={v.id}
              animateIn={"animate__fadeInUp"}
              initiallyVisible={true}
            >
              <Paper
                shadow={"xs"}
                key={v.id}
                w={400}
                p={"xs"}
                style={{
                  background: stylesGradient1,
                }}
              >
                <EmotionItemChart lsData={v.emotion} />
                <Stack align={"center"}>
                  <Stack
                    align={"center"}
                    justify={"center"}
                    p={"md"}
                    // sx={{
                    //   border: "1px solid gray",
                    //   borderRadius: 4,
                    // }}
                  >
                    <Flex justify={"space-between"} gap={"md"}>
                      <Stack justify={"center"} spacing={0} align="center">
                        <Title order={3} color={"orange.8"} fw={"bold"}>
                          {Intl.NumberFormat("id-id").format(v.total)}
                        </Title>
                        <Text align={"center"} color={"gray"}>
                          LOCKED AUDIENCE
                        </Text>
                      </Stack>
                      <Stack justify={"center"} spacing={0} align="center">
                        <Title order={3} color={"green.8"} fw={"bold"}>
                          {Intl.NumberFormat("id-id").format(
                            _.sum([
                              v.emotion.trust,
                              v.emotion.joy,
                              v.emotion.surprise,
                              v.emotion.anticipation,
                              v.emotion.sadness,
                              v.emotion.fear,
                              v.emotion.anger,
                              v.emotion.disgust,
                            ])
                          )}
                        </Title>
                        <Text align={"center"} color={"gray"}>
                          FILTERED AUDIENCE
                        </Text>
                      </Stack>
                    </Flex>
                    <Title color="blue.8" align={"center"}>
                      {_.upperCase(v.name)}
                    </Title>
                  </Stack>
                  <Button
                    color="cyan"
                    compact
                    onClick={() => {
                      // sSelectedProvince.set(v.id);
                      sSelectedProvince.value = v.id;
                      setOpenDetail.open();
                    }}
                    variant={"outline"}
                  >
                    DETAIL
                  </Button>
                </Stack>
              </Paper>
            </AnimationOnScroll>
          ))}
      </Group>
      <Modal fullScreen opened={openDetain} onClose={setOpenDetail.close}>
        <Paper p={"md"}>
          {sSelectedProvince.value && <EmotionViewDetail />}
        </Paper>
      </Modal>
    </>
  );
};

const EmotionDetailChart = ({ lsData }: { [key: string]: any }) => {
  const option: EChartsOption = {
    radiusAxis: {},
    polar: {},
    angleAxis: {
      type: "category",
      data: Object.keys(lsData),
      startAngle: 75,
    },
    tooltip: {
      show: true,
      formatter: (a: any, b) => {
        return `${a.data.name}: ${a.value}`;
      },
    },
    series: [
      {
        type: "bar",
        coordinateSystem: "polar",
        data: Object.keys(lsData).map(
          (v) =>
            ({
              name: v,
              value: lsData[v],
              itemStyle: {
                color:
                  listEmotionColor.find((v2) => _.lowerCase(v2.name) == v)
                    ?.color ?? "gray",
              },
            } as any)
        ),
        itemStyle: {
          shadowBlur: 20,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
        barWidth: 80,
      },
    ],
  };
  return (
    <>
      <EChartsReact
        style={{
          width: 300,
        }}
        option={option}
      />
    </>
  );
};

const EmotionViewDetail = () => {
  const [listDetail, setListDetail] = useState<
    ModelEmotionalViewViaProvinceCity[]
  >([]);
  useShallowEffect(() => {
    fetch(
      api.apiPredictiveAiEmotionalViewViaProvinceByDateCandidateProvince +
        `?date=${sSelectedDate.value}&candidateId=${sSelectedCandidate1.value}&provinceId=${sSelectedProvince.value}`
    )
      .then((v) => v.json())
      .then(setListDetail);
  }, []);
  return (
    <Stack>
      <Title>Emotion View Detail</Title>
      {/* {JSON.stringify(listDetail)} */}
      <Group position="center">
        {listDetail.map((v, i) => (
          <AnimationOnScroll
            key={i.toString()}
            initiallyVisible={true}
            animateIn={"animate__fadeInUp"}
          >
            <Paper
              key={v.city}
              p={"xs"}
              shadow={"sm"}
              bg={stylesRadial.out_blue}
              sx={{
                zIndex: 1000,
                overflow: "scroll",
                position: "relative",
              }}
            >
              <EmotionDetailChart lsData={v.emotion} />
              <Stack justify={"center"} align={"center"}>
                <Flex justify={"space-between"} gap={"md"}>
                  <Stack justify="center" align="center">
                    <Title  order={3} fw={"bold"} color={"orange.8"}>
                      {Intl.NumberFormat("id-ID").format(v.value)}
                    </Title>
                    <Text size={12} color="gray">LOCKED AUDIENCE</Text>
                  </Stack>
                  <Stack justify="center" align="center">
                    <Title order={3} fw={"bold"} color={"green.8"}>
                      {Intl.NumberFormat("id-ID").format(_.sum([
                              v.emotion.trust,
                              v.emotion.joy,
                              v.emotion.surprise,
                              v.emotion.anticipation,
                              v.emotion.sadness,
                              v.emotion.fear,
                              v.emotion.anger,
                              v.emotion.disgust,
                            ]))}
                    </Title>
                    <Text size={12} color="gray">FILTERED AUDIENCE</Text>
                  </Stack>
                </Flex>
                <Title order={5} color={"blue.8"}>
                  {_.upperCase(v.city)}
                </Title>
                <EmotionDetai2 data={v} />
              </Stack>
            </Paper>
          </AnimationOnScroll>
        ))}
      </Group>
    </Stack>
  );
};

const EmotionDetai2 = ({
  data,
}: {
  data: ModelEmotionalViewViaProvinceCity;
}) => {
  const [openmodal, setOpenmodal] = useDisclosure(false);
  const [dataKabupaten, setDataKabupaten] = useState<ModelDataKabupaten>();

  const lsData: any = data.emotion;
  const option1: EChartsOption = {
    title: {
      text: data.city,
    },
    radiusAxis: {},
    polar: {},
    angleAxis: {
      type: "category",
      data: Object.keys(lsData),
      startAngle: 75,
    },
    tooltip: {
      show: true,
      formatter: (a: any, b) => {
        return `${a.data.name}: ${a.value}`;
      },
    },
    series: [
      {
        type: "bar",
        coordinateSystem: "polar",
        data: Object.keys(lsData).map(
          (v) =>
            ({
              name: v,
              value: lsData[v],
              itemStyle: {
                color:
                  listEmotionColor.find((v2) => _.lowerCase(v2.name) == v)
                    ?.color ?? "gray",
              },
            } as any)
        ),
        itemStyle: {
          shadowBlur: 20,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
        barWidth: 80,
      },
    ],
  };

  // const dataContextDirection = {
  //   pendidikan: dataKabupaten?.attributes.pendidikan,
  //   infrastruktur: dataKabupaten?.attributes.aparatur_p,
  //   layanan_kesehatan: dataKabupaten?.attributes.tenaga_kes,
  //   keagamaan:
  //     Number(dataKabupaten?.attributes.islam ?? "0") +
  //     Number(dataKabupaten?.attributes.kristen ?? "0") +
  //     Number(dataKabupaten?.attributes.katholik ?? "0") +
  //     Number(dataKabupaten?.attributes.hindu ?? "0") +
  //     Number(dataKabupaten?.attributes.budha ?? "0"),
  //   kemiskinan: dataKabupaten?.attributes.belum_tida,
  //   lapangan_pekerjaan: dataKabupaten?.attributes.belum_tama,
  //   keadilan_sosial: dataKabupaten?.attributes.wiraswasta,
  // };

  // const dataChartGender = {
  //   pria: dataKabupaten?.attributes.pria,
  //   wanita: dataKabupaten?.attributes.wanita,
  // };

  // const dataChartUmur = {
  //   // u5: dataKabupaten?.attributes.u5,
  //   // u10: dataKabupaten?.attributes.u10,
  //   u15: dataKabupaten?.attributes.u15,
  //   u20: dataKabupaten?.attributes.u20,
  //   u25: dataKabupaten?.attributes.u25,
  //   u30: dataKabupaten?.attributes.u30,
  //   u35: dataKabupaten?.attributes.u35,
  //   u40: dataKabupaten?.attributes.u40,
  //   u45: dataKabupaten?.attributes.u45,
  //   u50: dataKabupaten?.attributes.u50,
  //   u55: dataKabupaten?.attributes.u55,
  //   u60: dataKabupaten?.attributes.u60,
  //   u65: dataKabupaten?.attributes.u65,
  //   u70: dataKabupaten?.attributes.u70,
  //   u75: dataKabupaten?.attributes.u75,
  // };

  // const dataChartPendidikan = {
  //   sltp: dataKabupaten?.attributes.sltp,
  //   slta: dataKabupaten?.attributes.slta,
  //   diploma1: dataKabupaten?.attributes.diploma_i_,
  //   diploma2: dataKabupaten?.attributes.diploma_ii,
  //   diploma4: dataKabupaten?.attributes.diploma_iv,
  //   strata2: dataKabupaten?.attributes.strata_ii,
  //   strata3: dataKabupaten?.attributes.strata_iii,
  // };

  // const dataChartEkonomi = {
  //   aparatur: dataKabupaten?.attributes.aparatur_p,
  //   pengajar: dataKabupaten?.attributes.tenaga_pen,
  //   tenaga_kesehatan: dataKabupaten?.attributes.tenaga_kes,
  //   wiraswasta: dataKabupaten?.attributes.wiraswasta,
  //   nelayan: dataKabupaten?.attributes.nelayan,
  //   petani: dataKabupaten?.attributes.pertanian_,
  //   tenaga_agama: dataKabupaten?.attributes.agama_dan_,
  //   pensiunan: dataKabupaten?.attributes.pensiunan,
  //   lainnya: dataKabupaten?.attributes.lainnya,
  // };

  const dataContextDirection = sCityContextDirection.value.find(
    (v) => v.cityId == data.cityId
  );

  const optionContextDirection: EChartsOption = {
    title: {
      text: "Context Direction",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: (a: any, b) => {
        // console.log(JSON.stringify(a));
        return `
        <div style="background:${stylesGradient1}; width: 300px; padding: 16px">
        <i>${_.upperCase(a[0].name)}</i>
        <h1>${Intl.NumberFormat("id-ID").format(a[0].value)} </h1>
        </div>
        `;
      },
    },
    legend: {},
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      boundaryGap: [0, 0.01],
      // max: 100,
      axisLabel: {
        formatter: (v: any) => {
          // console.log(JSON.stringify(v))
          return `${v} `;
        },
      },
    },
    yAxis: {
      type: "category",
      data: !dataContextDirection
        ? []
        : Object.values(
            dataContextDirection.content.map((v: any) => _.upperCase(v.name))
          ),
    },
    series: [
      {
        // name: "2011",
        type: "bar",
        data: !dataContextDirection
          ? []
          : Object.values(
              dataContextDirection.content.map((v: any) => v.value)
            ),
      },
    ],
  };

  useShallowEffect(() => {
    if (data && data.cityId) {
      fetch(api.apiUtilGetDataKabupatenById + `?id=${data.cityId}`)
        .then((v) => v.json())
        .then(setDataKabupaten);
    }
  }, []);

  return (
    <>
      <Button compact variant={"outline"} onClick={setOpenmodal.open}>
        Detail
      </Button>

      <Modal opened={openmodal} onClose={setOpenmodal.close} fullScreen >
        <Stack>
          {/* {JSON.stringify(data)} */}
          <SimpleGrid cols={2}>
            {/* {JSON.stringify(dataKabupaten)} */}
            <Paper p={"md"} shadow={"md"} bg={stylesGradient1}>
              <Stack>
                {/* {JSON.stringify(dataContextDirection)} */}
                <EChartsReact option={option1} />
                <Group position="center">
                  <Text fw={"bold"}>
                    {Intl.NumberFormat("id-ID").format(data.value)}
                  </Text>
                  <Text>DATA VOLUME</Text>
                </Group>
              </Stack>
            </Paper>
            <Paper shadow={"md"} p={"md"} bg={stylesGradient1}>
              <EChartsReact option={optionContextDirection} />
            </Paper>
            <WordCloud data={data} />
            <LeaderPersonaPredictionChart data={data} />
          </SimpleGrid>
          <Space h={70} />
          <SimpleGrid cols={4}>
            {/* <ChartPie data={dataChartGender} name={"Gender"} />
          <ChartPie data={dataChartUmur} name={"Usia"} />
          <ChartPie data={dataChartPendidikan} name={"Pendidikan"} />
          <ChartPie data={dataChartEkonomi} name={"Ekonomi"} /> */}
          </SimpleGrid>
        </Stack>
      </Modal>
    </>
  );
};

const WordCloud = ({ data }: { data: any }) => {
  // console.log(data.cityId)
  const [listData, setlistData] = useState<any[]>();
  useShallowEffect(() => {
    fetch(api.apiPredictiveAiWordCloudGet + `?cityId=${data.cityId}`)
      .then((v) => v.json())
      .then((v) => {
        if (v) {
          setlistData(v.data.content);
        }
      });
  }, []);

  return (
    <>
      <Paper shadow={"md"} p={"md"} bg={stylesGradient1}>
        <Title order={3}>Regions Hot Issue </Title>
        <Group p={0} spacing={0} align={"center"} position={"center"}>
          {listData?.map((v, i) => (
            <Tooltip key={Math.random()} label={v.title}>
              <Text
                fw={"bold"}
                span
                c={colors()}
                m={0}
                p={0}
                size={Math.floor(v.value / 2)}
              >
                {v.title}
              </Text>
            </Tooltip>
          ))}
        </Group>
      </Paper>
    </>
  );
};

const LeaderPersonaPredictionChart = ({ data }: { data: any }) => {
  const [listData, setlistData] = useState<any[]>([]);
  useShallowEffect(() => {
    fetch(api.apiPredictiveAiLeaderPersonaPrediction + `?cityId=${data.cityId}`)
      .then((v) => v.json())
      .then((v) => {
        if (v) {
          console.log(v);
          setlistData(v.data.content);
        }
      });
  }, []);

  const option1: EChartsOption = {
    // title: {
    //   text: "Context Direction",
    // },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: (a: any, b) => {
        // console.log(JSON.stringify(a));
        return `
        <div style="background:${stylesGradient1}; width: 300px; padding: 16px">
        <i>${_.upperCase(a[0].title)}</i>
        <h1>${Intl.NumberFormat("id-ID").format(a[0].value)} </h1>
        </div>
        `;
      },
    },
    legend: {},
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      boundaryGap: [0, 0.01],
      // max: 100,
      axisLabel: {
        formatter: (v: any) => {
          // console.log(JSON.stringify(v))
          return `${v} `;
        },
      },
    },
    yAxis: {
      type: "category",
      data: listData.map((v) => v.title),
    },
    series: [
      {
        // name: "2011",
        type: "bar",
        data: listData.map((v) => v.value),
      },
    ],
  };

  return (
    <>
      <Paper shadow={"md"} p={"md"} bg={stylesGradient1}>
        <Title order={3}>Leader Persona Prediction </Title>
        <EChartsReact option={option1} />
      </Paper>
    </>
  );
};

const ChartPie = ({ data, name }: { data: any; name: string }) => {
  const option2: EChartsOption = {
    title: {
      text: name,
    },
    tooltip: {
      trigger: "item",
    },
    // legend: {
    //   top: "5%",
    //   left: "center",
    // },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "80%"],
        // avoidLabelOverlap: true,
        label: {
          show: true,
          position: "inner",
        },
        // emphasis: {
        //   label: {
        //     show: true,
        //     fontSize: 40,
        //     fontWeight: "bold",
        //   },
        // },
        // labelLine: {
        //   show: false,
        // },
        data: Object.keys(data).map((v) => ({
          name: v,
          value: data[v],
        })),
      },
    ],
  };
  return (
    <>
      <EChartsReact option={option2} />
    </>
  );
};

export default EmotionalViewViaProvince;
