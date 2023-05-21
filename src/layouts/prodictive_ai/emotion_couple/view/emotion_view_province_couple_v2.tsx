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
} from "../../../dev/emotion_view_province_couple_v2/_val_emotion_view_province_couple_v2";
import { useAtom } from "jotai";
import { _fun_emotion_view_province_couple } from "../../../dev/emotion_view_province_couple_v2/_fun_emotion_view_province_couple_v2";
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
// let pag = 1;

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
    loadData();
  }, []);

  async function loadData() {
    fetch(
      api.apiPredictiveAiEmotionViewProvinceCoupleV2Get +
        `?candidate1=${selectedCandidate1}&candidate2=${selectedCandidate2}&search=${search}&page=${page}`
    )
      .then((val) => val.json())
      .then((v) => {
        if (v) {
          // setCount(v.count);

          setListEmotion(v.data);
          setHasmore(v.data.length < v.count);
          setPage((p) => p + 1);
          // setPage((p) => (p + 10 > v.count ? v.count : p + 10));
        }
      });

    // setHasmore(page * 10 < count);
  }

  async function loadMore() {
    // let pg = page + 1;
    // setPage(page + 1);
    // pag = page + 1;

    await loadData();
  }

  // function onLoadCandidate() {
  //   fetch(api.apiGetCandidate)
  //     .then((val) => val.json())
  //     .then(setListCandidate);
  // }

  if (!listEmotion || !listCandidate)
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
          // bg={"blue.1"}
          mx={"md"}
          shadow="md"
          pos={"sticky"}
          top={60}
          sx={{
            zIndex: 100,
          }}
        >
          <Group position="right" spacing={"md"}>
            {/* <Text>{page}</Text>
            <Text>{count}</Text> */}
            <TextInput
              onChange={(val) => {
                if (val) {
                  // setPage(1);
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
                  setPage(1);
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
                  setPage(1);
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

                loadData();
              }}
              radius={100}
            >
              PROCCESS
            </Button>
          </Group>
        </Paper>
        <Flex justify={"center"} align={"center"} p={"md"} gap={"lg"}>
          <Paper
            p={"xs"}
            shadow={"md"}
            // bg={stylesRadial.out_cyan}
          >
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
          <Paper
            p={"xs"}
            shadow={"md"}
            // bg={stylesRadial.out_blue}
          >
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
              <Flex>
                <Loader />
                <Title>Loading...</Title>
              </Flex>
            </Center>
          }
          dataLength={listEmotion.length}
          next={loadMore}
          hasMore={hasMore}
          // endMessage={<Center></Center>}
        >
          <Flex justify={"center"} align={"center"} wrap={"wrap"}>
            {listEmotion &&
              listEmotion.map((v, i) => (
                <Stack key={i}>
                  {/* <Text>{i + 1}</Text> */}
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
                    no={i + 1}
                  />
                  {/* // todo: hold sementara nunggu perhitungan dari fira */}
                  {/* <Flex gap={"md"}>
                    <Paper p={"xs"}>
                      <Title>{_.sum(_.flatMapDeep(v.value))}</Title>
                    </Paper>
                    <Paper p={"xs"}>
                      <Title>
                        {_.sum([
                          v.trust,
                          v.joy,
                          v.surprise,
                          v.anticipation,
                          v.sadness,
                          v.fear,
                          v.anger,
                          v.disgust,
                        ])}
                      </Title>
                    </Paper>
                  </Flex> */}
                </Stack>
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
  no,
}: {
  lsData: any;
  provinceId: string;
  provinceName: string;
  no: number;
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
      <Paper
        p="md"
        // bg={stylesRadial.out_cyan}
        m={"xs"}
      >
        <Stack align="center">
          <Flex gap="md">
            <Title c={"gray"}>{no}</Title>
            <Title order={1}>{provinceName}</Title>
          </Flex>
          <EChartsReact style={{ width: 400 }} option={option} />
        </Stack>
      </Paper>
    </>
  );
};
