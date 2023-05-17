import PageTitle from "@/layouts/page_title";

import {
  useDebouncedState,
  useDebouncedValue,
  useShallowEffect,
} from "@mantine/hooks";

import "colors";
import { mc_list_candidate } from "@/layouts/map_controll/map_controll_state";
import { stylesRadial } from "@/styles/styles_radial";
import EChartsReact from "echarts-for-react";
import { listEmotionColor } from "@/assets/list_emotion_color";
import _ from "lodash";
import { EChartsOption } from "echarts";
import {
  _val_list_emotion_view_province_couple,
  _val_selected_candidate1,
  _val_selected_candidate2,
} from "../dev/emotion_view_province_couple_v2/_val_emotion_view_province_couple_v2";
import { useAtom } from "jotai";
import { _fun_emotion_view_province_couple } from "../dev/emotion_view_province_couple_v2/_fun_emotion_view_province_couple_v2";
import {
  Button,
  Center,
  Flex,
  Group,
  Image,
  Loader,
  Paper,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { MdSearch } from "react-icons/md";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { api } from "@/lib/api";
let pag = 1;

export default function EmotionViewProvinceCoupleV2() {
  //   const [listEmotion, setListEmotion] = useAtom(
  //     _val_list_emotion_view_province_couple
  //   );
  //   const [selectedCandidate1, setSelectedCandidate1] = useAtom(
  //     _val_selected_candidate1
  //   );

  //   const [selectedCandidate2, setSelectedCandidate2] = useAtom(
  //     _val_selected_candidate2
  //   );

  const [listCandidate, setListCandidate] = useAtom(mc_list_candidate);
  const [search, setSearch] = useDebouncedState("", 200);
  const [page, setPage] = useState(1);
  const [selectedCandidate1, setSelectedCandidate1] = useState(1);
  const [selectedCandidate2, setSelectedCandidate2] = useState(2);
  const [listEmotion, setListEmotion] = useState<any[] | undefined>();
  const [count, setCount] = useState(0);
  const [hasMore, setHasmore] = useState(true);

  useShallowEffect(() => {
    // _fun_emotion_view_province_couple({
    //   setListEmotion,
    //   selectedCandidate1: selectedCandidate1,
    //   selectedCandidate2: selectedCandidate2,
    // });
    // console.log(selectedCandidate1, selectedCandidate2, "ini data select".yellow)
    loadData({ pg: 1 });
  }, []);

  async function loadData({ pg }: { pg: number }) {
    fetch(
      api.apiPredictiveAiEmotionViewProvinceCoupleV2Get +
        `?candidate1=${selectedCandidate1}&candidate2=${selectedCandidate2}&search=${search}&page=${pg}`
    )
      .then((val) => val.json())
      .then((v) => {
        if (listEmotion) {
          setHasmore((page * 10) < count);
        }
        setCount(v.count);
        setListEmotion(v.data);
      });
  }

  async function loadMore() {
    // let pg = page + 1;
    setPage(page + 1);
    pag = page + 1;
    await loadData({ pg: pag });
  }

  if (!listEmotion)
    return (
      <>
        <Center>
          <Flex align={"end"}>
            <Loader />
            <Title>Loading...</Title>
          </Flex>
        </Center>
      </>
    );
  return (
    <>
      <Stack spacing="xl">
        <PageTitle text="EMOTIONAL METERS BRAND MERGER SIMULATION" />
        {/* {JSON.stringify(listEmotion)} */}
        <Paper
          p="xs"
          bg={"blue.1"}
          mx={"md"}
          shadow="md"
          pos={"sticky"}
          top={60}
          sx={{
            zIndex: 100,
          }}
        >
          <Group position="right" spacing={"md"}>
            <TextInput
              onChange={(val) => {
                if (val) {
                  setSearch(val.target.value);
                }
              }}
              placeholder="Search"
              radius={100}
              sx={stylesRadial}
              icon={<MdSearch />}
            />
            <Select
              radius={100}
              value={
                listCandidate?.find((v) => v.id === selectedCandidate1)?.name
              }
              placeholder={
                listCandidate?.find((v) => v.id === selectedCandidate1)?.name
              }
              data={
                listCandidate?.map((v) => ({
                  label: v.name,
                  value: v.id,
                })) as any
              }
              onChange={(val) => {
                if (val) {
                  setSelectedCandidate1(Number(val));
                }
              }}
            />
            <Select
              radius={100}
              // label={"selectct candidate 1"}
              value={
                listCandidate?.find((v) => v.id === selectedCandidate2)?.name
              }
              placeholder={
                listCandidate?.find((v) => v.id === selectedCandidate2)?.name
              }
              data={
                listCandidate?.map((v) => ({
                  label: v.name,
                  value: v.id,
                })) as any
              }
              onChange={(val) => {
                if (val) {
                  setSelectedCandidate2(Number(val));
                }
              }}
            />
            <Button
              onClick={() => {
                // _fun_emotion_view_province_couple({
                //   setListEmotion,
                //   selectedCandidate1: selectedCandidate1,
                //   selectedCandidate2: selectedCandidate2,
                // });
                loadData({ pg: 1 });
              }}
              radius={100}
            >
              PROCCESS
            </Button>
          </Group>
        </Paper>
        <Flex justify={"center"} align={"center"} p={"md"} gap={"lg"}>
          <Paper p={"xs"} shadow={"md"} bg={stylesRadial.out_cyan}>
            <Stack w={200} align="center">
              <Image
                radius={10}
                width={100}
                height={100}
                src={
                  listCandidate?.find((v) => v.id === selectedCandidate1)?.img
                }
                alt=""
              />
              <Title align="center" lineClamp={1} color="gray.7" order={3}>
                {listCandidate?.find((v) => v.id === selectedCandidate1)?.name}
              </Title>
            </Stack>
          </Paper>
          <Paper p={"xs"} shadow={"md"} bg={stylesRadial.out_blue}>
            <Stack w={200} align="center">
              <Image
                radius={10}
                width={100}
                height={100}
                src={
                  listCandidate?.find((v) => v.id === selectedCandidate2)?.img
                }
                alt=""
              />
              <Title align="center" lineClamp={1} color="gray.7" order={3}>
                {listCandidate?.find((v) => v.id === selectedCandidate2)?.name}
              </Title>
            </Stack>
          </Paper>
        </Flex>
        {/* {JSON.stringify(listEmotion)} */}
        <InfiniteScroll
          loader={
            <Center>
              <Loader />
            </Center>
          }
          dataLength={listEmotion.length}
          next={loadMore}
          hasMore={hasMore}
          endMessage={<Center>No more data</Center>}
        >
          <Flex justify={"center"} align={"center"} wrap={"wrap"}>
            {listEmotion &&
              listEmotion.map((v, i) => (
                <EmotionItemChart
                  lsData={{
                    trust: v.trust,
                    joy: v.joy,
                    surprise: v.surprise,
                    anticipation: v.anticipation,
                    sadness: v.sadness,
                    fear: v.fear,
                    anger: v.anger,
                    disgust: v.disgust,
                  }}
                  provinceId={v.provinceId}
                  provinceName={v.provinceName}
                  key={i}
                />
              ))}
          </Flex>
        </InfiniteScroll>
      </Stack>
    </>
  );
}

const EmotionItemChart = ({
  lsData,
  provinceId,
  provinceName,
}: {
  lsData: any;
  provinceId: string;
  provinceName: string;
}) => {
  const option: EChartsOption = {
    radiusAxis: {},
    polar: {},
    angleAxis: {
      type: "category",
      data: _.keys(lsData ?? []),
      startAngle: 75,
    },
    tooltip: {
      show: true,
      formatter: (a: any, b: any) => {
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
        data: Object.keys(lsData ?? []).map(
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
      {/* {JSON.stringify(lsData)} */}
      <Paper p="md" bg={stylesRadial.out_cyan} m={"xs"}>
        <Stack align="center">
          <Title order={1}>{provinceName}</Title>
          <EChartsReact style={{ width: 400 }} option={option} />
        </Stack>
      </Paper>
    </>
  );
};
