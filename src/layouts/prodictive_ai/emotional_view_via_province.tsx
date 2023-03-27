import { listEmotionColor } from "@/assets/list_emotion_color";
import { funcLoadEmotionalViwViaProvinceByDate } from "@/fun_load/func_load_emotion_view_via_province";
import { gCandidate } from "@/g_state/g_candidate";
import { gSelectedView } from "@/g_state/g_selected_view";
import { glistCandidate, gSelectedDate } from "@/g_state/g_map_state";
import { gSelectedProvince } from "@/g_state/g_selected_province";
import { gSelectedCandidate1 } from "@/g_state/nation_wide_rating/g_selected_candidate1";
import { gEmotionalViewViaProvince } from "@/g_state/predictive_ai/g_emotional_view_via_province";
import { gEmotionalViewViaProvinceCity } from "@/g_state/predictive_ai/g_emotional_view_via_province_city";
import { api } from "@/lib/api";
import { ModelDataKabupaten } from "@/model/model_data_kabupaten";
import { ModelEmotionalViewViaProvinceCity } from "@/model/predictive_ai/model_emotional_view_via_province_city";
import {
  Box,
  Button,
  Group,
  Modal,
  Paper,
  Select,
  SimpleGrid,
  Space,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import {
  useDisclosure,
  useShallowEffect,
  useForceUpdate,
} from "@mantine/hooks";
import { EChartsOption, Model } from "echarts";
import EChartsReact from "echarts-for-react";
import _ from "lodash";
import { useState } from "react";
import { MdSearch } from "react-icons/md";
import PageTitle from "../page_title";

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
      <EChartsReact option={option} />
    </>
  );
};

const EmotionalViewViaProvince = () => {
  const [openDetain, setOpenDetail] = useDisclosure(false);
  const update = useForceUpdate();
  const [search, setSearch] = useState("");
  return (
    <>
      {/* <Text size={32} fw={"bold"} color={"cyan.8"}>
        {_.upperCase(gSelectedView.value)}
      </Text> */}
      {/* {JSON.stringify(gEmotionalViewViaProvince.value[0])} */}
      <PageTitle text="EMOTIONAL METERS BRAND MERGER SIMULATION" />
      <Group
        position="right"
        pos={"sticky"}
        top={80}
        sx={{
          zIndex: 100,
        }}
      >
        <TextInput
          placeholder="search"
          onChange={(val) => setSearch(val.currentTarget.value)}
          icon={<MdSearch />}
        />
        <Select
          placeholder={
            gCandidate.value.find((v) => v.id == gSelectedCandidate1.value)
              ?.name
          }
          data={
            gCandidate.value.map((v) => ({
              label: v.name,
              value: v.id,
            })) as any
          }
          onChange={async (val) => {
            gSelectedCandidate1.set(Number(val));
            await funcLoadEmotionalViwViaProvinceByDate();
            update();
          }}
        />
      </Group>
      <Group position="center">
        {gEmotionalViewViaProvince.value
          .filter((v) => _.lowerCase(v.name).includes(_.lowerCase(search)))
          .map((v) => (
            <Paper key={v.id} w={400} p={"xs"}>
              <EmotionItemChart lsData={v.emotion} />
              <Stack align={"center"}>
                <Text fw={"bold"}>{_.upperCase(v.name)}</Text>
                <Stack
                  align={"center"}
                  justify={"center"}
                  p={"md"}
                  // sx={{
                  //   border: "1px solid gray",
                  //   borderRadius: 4,
                  // }}
                >
                  <Text color={"cyan.8"} size={32} fw={"bold"}>
                    {Intl.NumberFormat("id-id").format(v.value)}
                  </Text>
                  <Text color={"gray"}>sampler</Text>
                </Stack>
                <Button
                  onClick={() => {
                    gSelectedProvince.set(v.id);
                    setOpenDetail.open();
                  }}
                  variant={"outline"}
                >
                  detail
                </Button>
              </Stack>
            </Paper>
          ))}
      </Group>
      <Modal fullScreen opened={openDetain} onClose={setOpenDetail.close}>
        {gSelectedProvince.value && <EmotionViewDetail />}
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
        `?date=${gSelectedDate.value}&candidateId=${gSelectedCandidate1.value}&provinceId=${gSelectedProvince.value}`
    )
      .then((v) => v.json())
      .then(setListDetail);
  }, []);
  return (
    <>
      <Text>Emotion View Detail</Text>
      {/* {JSON.stringify(listDetail)} */}
      <Group position="center">
        {listDetail.map((v) => (
          <Box key={v.city}>
            <EmotionDetailChart lsData={v.emotion} />
            <Stack justify={"center"} align={"center"}>
              <Text fw={"bold"} color={"teal.8"}>
                {_.upperCase(v.city)}
              </Text>
              <Text size={32} fw={"bold"} color={"gray"}>
                {Intl.NumberFormat("id-ID").format(v.value)}
              </Text>
              <EmotionDetai2 data={v} />
            </Stack>
          </Box>
        ))}
      </Group>
    </>
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

  const dataContextDirection = {
    pendidikan: dataKabupaten?.attributes.pendidikan,
    infrastruktur: dataKabupaten?.attributes.aparatur_p,
    layanan_kesehatan: dataKabupaten?.attributes.tenaga_kes,
    keagamaan:
      Number(dataKabupaten?.attributes.islam ?? "0") +
      Number(dataKabupaten?.attributes.kristen ?? "0") +
      Number(dataKabupaten?.attributes.katholik ?? "0") +
      Number(dataKabupaten?.attributes.hindu ?? "0") +
      Number(dataKabupaten?.attributes.budha ?? "0"),
    kemiskinan: dataKabupaten?.attributes.belum_tida,
    lapangan_pekerjaan: dataKabupaten?.attributes.belum_tama,
    keadilan_sosial: dataKabupaten?.attributes.wiraswasta,
  };

  const dataChartGender = {
    pria: dataKabupaten?.attributes.pria,
    wanita: dataKabupaten?.attributes.wanita,
  };

  const dataChartUmur = {
    u5: dataKabupaten?.attributes.u5,
    u10: dataKabupaten?.attributes.u10,
    u15: dataKabupaten?.attributes.u15,
    u20: dataKabupaten?.attributes.u20,
    u25: dataKabupaten?.attributes.u25,
    u30: dataKabupaten?.attributes.u30,
    u35: dataKabupaten?.attributes.u35,
    u40: dataKabupaten?.attributes.u40,
    u45: dataKabupaten?.attributes.u45,
    u50: dataKabupaten?.attributes.u50,
    u55: dataKabupaten?.attributes.u55,
    u60: dataKabupaten?.attributes.u60,
    u65: dataKabupaten?.attributes.u65,
    u70: dataKabupaten?.attributes.u70,
    u75: dataKabupaten?.attributes.u75,
  };

  const dataChartPendidikan = {
    sltp: dataKabupaten?.attributes.sltp,
    slta: dataKabupaten?.attributes.slta,
    diploma1: dataKabupaten?.attributes.diploma_i_,
    diploma2: dataKabupaten?.attributes.diploma_ii,
    diploma4: dataKabupaten?.attributes.diploma_iv,
    strata2: dataKabupaten?.attributes.strata_ii,
    strata3: dataKabupaten?.attributes.strata_iii,
  };

  const dataChartEkonomi = {
    aparatur: dataKabupaten?.attributes.aparatur_p,
    pengajar: dataKabupaten?.attributes.tenaga_pen,
    tenaga_kesehatan: dataKabupaten?.attributes.tenaga_kes,
    wiraswasta: dataKabupaten?.attributes.wiraswasta,
    nelayan: dataKabupaten?.attributes.nelayan,
    petani: dataKabupaten?.attributes.pertanian_,
    tenaga_agama: dataKabupaten?.attributes.agama_dan_,
    pensiunan: dataKabupaten?.attributes.pensiunan,
    lainnya: dataKabupaten?.attributes.lainnya,
  };

  const optionContextDirection = {
    title: {
      text: "Context Direction",
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
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
    },
    yAxis: {
      type: "category",
      data: Object.keys(dataContextDirection),
    },
    series: [
      {
        // name: "2011",
        type: "bar",
        data: Object.values(dataContextDirection),
      },
    ],
  };

  useShallowEffect(() => {
    fetch(api.apiUtilGetDataKabupatenById + `?id=${data.cityId}`)
      .then((v) => v.json())
      .then(setDataKabupaten);
  }, []);

  return (
    <>
      <Button onClick={setOpenmodal.open}>Detail</Button>
      <Modal opened={openmodal} onClose={setOpenmodal.close} fullScreen>
        {/* {JSON.stringify(dataKabupaten)} */}
        <SimpleGrid cols={2}>
          {/* {JSON.stringify(dataKabupaten)} */}
          <Stack>
            <EChartsReact option={option1} />
            <Group position="center">
              <Text fw={"bold"}>
                {Intl.NumberFormat("id-ID").format(data.value)}
              </Text>
              <Text>Data Sampler</Text>
            </Group>
          </Stack>
          <EChartsReact option={optionContextDirection} />
        </SimpleGrid>
        <Space h={70} />
        {/* <SimpleGrid cols={4}>
          <ChartPie data={dataChartGender} name={"Gender"} />
          <ChartPie data={dataChartUmur} name={"Usia"} />
          <ChartPie data={dataChartPendidikan} name={"Pendidikan"} />
          <ChartPie data={dataChartEkonomi} name={"Ekonomi"} />
        </SimpleGrid> */}
      </Modal>
    </>
  );
};

const ChartPie = ({data, name}: {data: any, name: string}) => {
  const option2:EChartsOption = {
    title: {
      text: name
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
          value: data[v]
        })),
      },
    ],
  };
  return <>
  <EChartsReact option={option2} />
  </>
}

export default EmotionalViewViaProvince;
