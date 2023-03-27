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
  Flex,
  Group,
  Image,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import {
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
      <EChartsReact style={{ width: 400 }} option={option} />
    </>
  );
};

const EmotionalViewViaProvinceCouple = () => {
  const update = useForceUpdate();
  const [listData, setListData] = useState([]);
  const [search, setSearch] = useInputState("");
  useShallowEffect(() => {
    proccessData();
  }, []);
  const proccessData = async () => {
    fetch(
      api.apiPredictiveAiEmotionalViewViaProvinceCoupleByDateCandiate +
        `?date=${gSelectedDate.value}&candidate1=${gSelectedCandidate1.value}&candidate2=${gSelectedCandidate2.value}`
    )
      .then((res) => res.json())
      .then(setListData);
  };
  return (
    <>
      {/* <Title color={"cyan.8"}>{_.upperCase(gSelectedView.value)}</Title> */}
      <PageTitle text="EMOTIONAL METERS BRAND MERGER SIMULATION" />
      <Group
        p={"xs"}
        bg={"blue.1"}
        position="right"
        my={50}
        pos={"sticky"}
        top={100}
        sx={{
          zIndex: 100,
        }}
      >
        <TextInput
          value={search}
          onChange={setSearch}
          placeholder={"search"}
          icon={<MdSearch />}
        />
        <Select
          placeholder={
            gCandidate.value.find((v) => v.id === gSelectedCandidate1.value)
              ?.name
          }
          searchable
          data={
            gCandidate.value.map((v) => ({
              label: v.name,
              value: v.id,
              disabled: v.id == gSelectedCandidate2.value,
            })) as any
          }
          onChange={(val) => {
            if (val) {
              gSelectedCandidate1.set(Number(val));
              update();
            }
          }}
        />
        <SwipeButton update={update} />
        <Select
          placeholder={
            gCandidate.value.find((v) => v.id === gSelectedCandidate2.value)
              ?.name
          }
          searchable
          data={
            gCandidate.value.map((v) => ({
              label: v.name,
              value: v.id,
              disabled: v.id == gSelectedCandidate1.value,
            })) as any
          }
          onChange={(val) => {
            if (val) {
              gSelectedCandidate2.set(Number(val));
              update();
            }
          }}
        />
        <Button onClick={proccessData}>PROCCESS</Button>
      </Group>
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
              gCandidate.value.find((v) => v.id == gSelectedCandidate2.value)
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
              gCandidate.value.find((v) => v.id == gSelectedCandidate1.value)
                ?.name
            }
          </Text>
        </Stack>
      </Flex>
      {/* {JSON.stringify(listData)} */}
      <Flex direction={"row"} wrap={"wrap"} justify={"center"} align={"center"}>
        {listData
          .filter((v: any) => _.lowerCase(v.name).includes(_.lowerCase(search)))
          .map((v: any) => (
            <Paper key={v.provinceId} p={"xs"} m={"md"}>
              <Stack
                key={v.provinceId}
                w={400}
                align={"center"}
                justify={"center"}
                spacing={"lg"}
              >
                <EmotionItemChart lsData={v.emotion} />
                <Text size={32}>
                  {gProvince.value.find((p) => p.id == v.provinceId).name}
                </Text>
              </Stack>
            </Paper>
          ))}
      </Flex>
    </>
  );
};

export default EmotionalViewViaProvinceCouple;
