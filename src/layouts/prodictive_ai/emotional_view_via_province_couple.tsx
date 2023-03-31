import { listEmotionColor } from "@/assets/list_emotion_color";
import { gCandidate } from "@/g_state/g_candidate";
import { gSelectedView } from "@/g_state/g_selected_view";
import { gSelectedDate } from "@/g_state/g_map_state";
import { gProvince } from "@/g_state/g_province";
import { gSelectedCandidate1 } from "@/g_state/nation_wide_rating/g_selected_candidate1";
import { gSelectedCandidate2 } from "@/g_state/nation_wide_rating/g_selected_candidate2";
import { api } from "@/lib/api";
import {
  Box,
  Button,
  Center,
  Flex,
  Group,
  Image,
  Modal,
  Paper,
  ScrollArea,
  Select,
  SimpleGrid,
  Space,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import {
  useDisclosure,
  useForceUpdate,
  useInputState,
  useShallowEffect,
} from "@mantine/hooks";
import { EChartsOption } from "echarts";
import EChartsReact from "echarts-for-react";
import _ from "lodash";
import { useState } from "react";
import { MdJoinInner, MdSearch } from "react-icons/md";
import PageTitle from "../page_title";
import SwipeButton from "./swipe_button";
import { gListDataPredictiveAiCouple } from "@/g_state/g_list_data_predictive_ai_couple";
import { gPredictiveAiSearch } from "@/g_state/g_predictive_ai_search";
import SelectCandidateView from "./select_candidate_view";
import { stylesGradient1 } from "@/styles/styles_gradient_1";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { stylesGradientRed } from "@/styles/styles_gradient_red";
import { stylesGradientYellow } from "@/styles/styles_gradient_yellow";
import { funcLoadEmotionalViwViaProvinceCouple } from "@/fun_load/func_load_emotion_view_via_province_couple";
import { sEmotionalViewViaProvinceCouple } from "@/s_state/s_emotional_view_via_province_couple";
import { listAnimation } from "@/styles/styles_animation";
import { sCityContextDirection } from "@/s_state/s_city_ontext_irection";
import { ModelDataKabupaten } from "@/model/model_data_kabupaten";

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
        <h1>${a.value} %</h1>
        `;
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
      <EChartsReact style={{ width: 400 }} option={option} />
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

const EmotionalViewViaProvinceCouple = () => {
  const update = useForceUpdate();
  const proccessData = async () => {
    fetch(
      api.apiPredictiveAiEmotionalViewViaProvinceCoupleByDateCandiate +
        `?date=${gSelectedDate.value}&candidate1=${gSelectedCandidate1.value}&candidate2=${gSelectedCandidate2.value}`
    )
      .then((res) => res.json())
      .then((val) => {
        gListDataPredictiveAiCouple.set(val);
        update();
      });
  };

  useShallowEffect(() => {
    proccessData();
  }, []);

  if (gSelectedView.value != "Emotional View Via Province Couple")
    return <>${gSelectedView.value}</>;
  return (
    <>
      {/* <Title color={"cyan.8"}>{_.upperCase(gSelectedView.value)}</Title> */}
      <PageTitle text="EMOTIONAL METERS BRAND MERGER SIMULATION" />
      <SelectCandidateView onProccess={proccessData} onUpdate={update} />
      <Paper
        p={"md"}
        shadow={"md"}
        style={{
          background: stylesGradientYellow,
        }}
      >
        <Flex direction={"row"} align={"center"} justify={"center"} p={"lg"}>
          <Stack align={"center"}>
            <Image
              radius={100}
              width={100}
              src={
                gCandidate.value.find((v) => v.id == gSelectedCandidate1.value)
                  ?.img
              }
              alt={"gambar_1"}
            />
            <Text>
              {
                gCandidate.value.find((v) => v.id == gSelectedCandidate1.value)
                  ?.name
              }
            </Text>
          </Stack>
          <Box p={"lg"}>
            <MdJoinInner color="orange" size={53} />
          </Box>
          <Stack align={"center"}>
            <Image
              radius={100}
              width={100}
              src={
                gCandidate.value.find((v) => v.id == gSelectedCandidate2.value)
                  ?.img
              }
              alt={"gambar_1"}
            />
            <Text>
              {
                gCandidate.value.find((v) => v.id == gSelectedCandidate2.value)
                  ?.name
              }
            </Text>
          </Stack>
        </Flex>
      </Paper>
      {/* {JSON.stringify(listData)} */}
      <Flex direction={"row"} wrap={"wrap"} justify={"center"} align={"center"}>
        {gListDataPredictiveAiCouple.value
          .filter((v: any) =>
            _.lowerCase(v.name).includes(_.lowerCase(gPredictiveAiSearch.value))
          )
          .map((v: any) => (
            <AnimationOnScroll
              key={v.provinceId}
              initiallyVisible={true}
              animateIn={"animate__backInUp"}
            >
              <Paper
                shadow={"xs"}
                key={v.provinceId}
                p={"xs"}
                m={"md"}
                style={{
                  backgroundImage: stylesGradient1,
                }}
              >
                <Stack
                  key={v.provinceId}
                  w={400}
                  align={"center"}
                  justify={"center"}
                  spacing={"lg"}
                >
                  <EmotionItemChart lsData={v.emotion} />
                  <Stack spacing={0} justify={"center"}>
                    <Title c={"blue.8"}>
                      {Intl.NumberFormat("id-ID").format(v.value)}
                    </Title>
                    <Text align="center" c={"gray"}>
                      DATA VOLUME
                    </Text>
                  </Stack>
                  <Text size={24}>
                    {gProvince.value.find((p) => p.id == v.provinceId).name}
                  </Text>
                  <EmotionalViewDetailButton
                    provinceId={v.provinceId}
                    provinceName={
                      gProvince.value.find((p) => p.id == v.provinceId).name
                    }
                  />
                </Stack>
              </Paper>
            </AnimationOnScroll>
          ))}
      </Flex>
    </>
  );
};

const EmotionalViewDetailButton = ({
  provinceId,
  provinceName,
}: {
  provinceId: string;
  provinceName: string;
}) => {
  const [open, setOpen] = useDisclosure(false);

  return (
    <>
      <Button onClick={setOpen.open} compact variant={"outline"}>
        DETAIL
      </Button>
      <Modal
        fullScreen
        opened={open}
        onClose={setOpen.close}
        style={{ position: "relative" }}
      >
        <ScrollArea h={"100vh"} pos={"relative"}>
          <LayoutDetailDialog
            provinceId={provinceId}
            provinceName={provinceName}
          />
        </ScrollArea>
      </Modal>
    </>
  );
};

const LayoutDetailDialog = ({
  provinceId,
  provinceName,
}: {
  provinceId: string;
  provinceName: string;
}) => {
  useShallowEffect(() => {
    funcLoadEmotionalViwViaProvinceCouple(provinceId);
  }, []);
  return (
    <>
      <Title>{provinceName}</Title>
      <Space h={46} />
      <Group position="center">
        {sEmotionalViewViaProvinceCouple.value.map((v) => (
          <AnimationOnScroll
            key={v.cityId}
            initiallyVisible={true}
            animateIn={listAnimation.animate__flipInX}
          >
            <Paper p={"xs"} shadow={"sm"} bg={stylesGradient1} pos={"relative"}>
              <Stack justify={"center"}>
                <EmotionDetailChart lsData={v.emotion} />
                <Text size={24} color={"cyan.8"} align={"center"}>
                  {v.cityName}
                </Text>
                <Title color={"gray"} align={"center"}>
                  {Intl.NumberFormat("id-ID").format(v.cityValue)}
                </Title>
                <ButtonDetail2 data={v} />
              </Stack>
            </Paper>
          </AnimationOnScroll>
        ))}
      </Group>
    </>
  );
};

const ButtonDetail2 = ({ data }: { data: any }) => {
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
      <Button compact variant={"gradient"} onClick={setOpenmodal.open}>
        Detail
      </Button>

      <Modal
        opened={openmodal}
        onClose={setOpenmodal.close}
        fullScreen
        style={{ position: "relative" }}
      >
        <ScrollArea h={"100vh"} pos={"relative"}>
          {/* {JSON.stringify(dataKabupaten)} */}
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
          </SimpleGrid>
          <Space h={70} />
          <SimpleGrid cols={4}>
            {/* <ChartPie data={dataChartGender} name={"Gender"} />
            <ChartPie data={dataChartUmur} name={"Usia"} />
            <ChartPie data={dataChartPendidikan} name={"Pendidikan"} />
            <ChartPie data={dataChartEkonomi} name={"Ekonomi"} /> */}
          </SimpleGrid>
        </ScrollArea>
      </Modal>
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

export default EmotionalViewViaProvinceCouple;
