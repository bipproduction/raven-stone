import { listEmotionColor } from "@/assets/list_emotion_color";
import { funcLoadEmotionalViwViaProvinceByDate } from "@/fun_load/func_load_emotion_view_via_province";
import { gCandidate } from "@/g_state/g_candidate";
import { gSelectedView } from "@/g_state/g_dasboard";
import { glistCandidate, gSelectedDate } from "@/g_state/g_map_state";
import { gSelectedProvince } from "@/g_state/g_selected_province";
import { gSelectedCandidate1 } from "@/g_state/nation_wide_rating/g_selected_candidate1";
import { gEmotionalViewViaProvince } from "@/g_state/predictive_ai/g_emotional_view_via_province";
import { gEmotionalViewViaProvinceCity } from "@/g_state/predictive_ai/g_emotional_view_via_province_city";
import { api } from "@/lib/api";
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
      <Text size={32} fw={"bold"} color={"cyan.8"}>
        {_.upperCase(gSelectedView.value)}
      </Text>
      {/* {JSON.stringify(gEmotionalViewViaProvince.value[0])} */}
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
              <EmotionDetai2 />
            </Stack>
          </Box>
        ))}
      </Group>
    </>
  );
};

const EmotionDetai2 = () => {
  const [openmodal, setOpenmodal] = useDisclosure(false);

  const option1 = {
    title: [
      {
        text: "Radial Polar Bar Label Position (middle)",
      },
    ],
    polar: {
      radius: [30, "80%"],
    },
    radiusAxis: {
      max: 4,
    },
    angleAxis: {
      type: "category",
      data: ["a", "b", "c", "d"],
      startAngle: 75,
    },
    tooltip: {},
    series: {
      type: "bar",
      data: [2, 1.2, 2.4, 3.6],
      coordinateSystem: "polar",
      label: {
        show: true,
        position: "middle", // or 'start', 'insideStart', 'end', 'insideEnd'
        formatter: "{b}: {c}",
      },
    },
    animation: false,
  };

  const option2 = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" },
        ],
      },
    ],
  };

  const option3 = {
    title: {
      text: "World Population",
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
      data: ["Brazil", "Indonesia", "USA", "India", "China", "World"],
    },
    series: [
      {
        name: "2011",
        type: "bar",
        data: [18203, 23489, 29034, 104970, 131744, 630230],
      },
    ],
  };
  return (
    <>
      <Button onClick={setOpenmodal.open}>Detail</Button>
      <Modal opened={openmodal} onClose={setOpenmodal.close} fullScreen>
        <SimpleGrid cols={2}>
          <EChartsReact option={option1} />
          <EChartsReact option={option3} />
        </SimpleGrid>
        <Space h={70} />
        <SimpleGrid cols={4}>
          <EChartsReact option={option2} />
          <EChartsReact option={option2} />
          <EChartsReact option={option2} />
          <EChartsReact option={option2} />
        </SimpleGrid>
      </Modal>
    </>
  );
};

export default EmotionalViewViaProvince;
