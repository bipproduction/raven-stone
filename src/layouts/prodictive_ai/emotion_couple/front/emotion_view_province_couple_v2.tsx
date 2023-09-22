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
import _, { filter } from "lodash";
import { EChartsOption } from "echarts";
import {
  _val_list_emotion_view_province_couple,
  _val_selected_candidate1,
  _val_selected_candidate2,
} from "../../../dev/emotion_view_province_couple_v2/_val_emotion_view_province_couple_v2";
import { atom, useAtom } from "jotai";
import { _fun_emotion_view_province_couple } from "../../../dev/emotion_view_province_couple_v2/_fun_emotion_view_province_couple_v2";
import {
  AspectRatio,
  BackgroundImage,
  Box,
  Button,
  Center,
  Flex,
  Grid,
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
import useTranslate from "next-translate/useTranslation";
import PageSubTitle from "@/global/components/PageSubTitle";
import { listColorChart } from "@/global/fun/color_chart";
import { COLOR } from "@/global/fun/color_global";
import moment from "moment";

export const dataAudience = atom<any[]>([]);

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
  const { t, lang } = useTranslate();
  const [listData, setListData] = useState<any[] | null>(null);
  const [listDataAudience, setListDataAudience] = useAtom(dataAudience);
  const styling = {
    backgroundImage: `url('${
      listCandidate?.find((v) => v.id === selectedCandidate1)?.img
    }')`,
    width: "200",
    height: "200",
  };

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

    fetch(
      api.apiPredictiveAiV3NationWideRatingListDataGet +
        `?candidate1Id=${selectedCandidate1}&candidate2Id=${selectedCandidate2}&date=${moment().format(
          "YYYY-MM-DD"
        )}`
    )
      .then((v) => v.json())
      .then((v) => setListData(v));

    fetch(
      api.apiSummaryGetTop10ProvinceByConversation +
        `?date=${moment().format(
          "YYYY-MM-DD"
        )}&emotion=Trust&candidateId=${selectedCandidate1}&search=`
    )
      .then((v) => v.json())
      .then((v) => {
        setListDataAudience(v);
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
      <PageSubTitle
        text1={t("common:p_regional")}
        text2={t("common:p_data_pairing")}
      />
      <Stack spacing="xl" pl={30} pr={30}>
        {/* <PageTitle
          title={_.upperCase(t('common:emotional_view_via_province_couple'))}
          text={_.upperCase(t('common:emotional_meters_brand_merger_simulation'))}
        /> */}
        {/* {JSON.stringify(listEmotion)} */}

        {/* raven */}
        <Box
        pos={"sticky"}
        top={0}
        sx={{
          zIndex: 100,
          backgroundColor: "#230D38",
          padding: 5,
        }}
        pt={"sm"}
        pb={"sm"}
        >
          <Group spacing="xl">
            {/* <Text>{page}</Text>
            <Text>{count}</Text> */}
            <TextInput
              onChange={(val) => {
                if (val) {
                  // setPage(1);
                  setSearch(val.target.value);
                }
              }}
              placeholder={t("common:search")}
              label={
                <Text fz={17} color="white">
                  {t("common:select_regions")}
                </Text>
              }
              radius={8}
              sx={stylesRadial}
              icon={<MdSearch />}
            />
            <Select
              label={
                <Text fz={17} color="white" fw={"bold"}>
                  {t("common:candidate")} 1
                </Text>
              }
              radius={8}
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
              radius={8}
              label={
                <Text fz={17} color="white" fw={"bold"}>
                  {t("common:candidate")} 2
                </Text>
              }
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
            <Group spacing={50} pt={25}>
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
                color="gray.0"
              >
                <Text color="dark" fz={17}>
                  {_.upperCase(t("common:generate"))}
                </Text>
              </Button>
            </Group>
          </Group>
        </Box>
        {/* akhir raven */}

        <Grid gutter={5} gutterXs="md" gutterMd="xl" gutterXl={50} pt={50}>
          <Grid.Col md={5} lg={5}>
            <Box
              pos={"sticky"}
              top={153}
              sx={{
                zIndex: 80,
              }}
            >
              <Grid>
                <Grid.Col md={6} lg={6}>
                  <Box>
                    <AspectRatio ratio={1 / 1}>
                      <BackgroundImage
                        radius={10}
                        w={200}
                        h={200}
                        src={
                          listCandidate?.find(
                            (v) => v.id === selectedCandidate1
                          )?.img
                        }
                      >
                        <AspectRatio
                          ratio={3 / 2}
                          sx={{
                            // position: "relative",
                            bottom: "-35%",
                            height: 20,
                            width: "100%",
                            backgroundColor: "#343a40",
                            marginLeft: 2,
                            borderTopRightRadius: 10,
                            borderBottomRightRadius: 10,
                            display: "flex",
                            flex: 1,
                            marginRight: 60,
                          }}
                        >
                          <Title
                            sx={{
                              display: "flex",
                              flex: 1,
                              alignContent: "center",
                            }}
                            fw={"bold"}
                            fz={{ lg: 10, md: 6, sm: 4 }}
                            color="white"
                          >
                            PRESIDENT
                          </Title>
                        </AspectRatio>
                      </BackgroundImage>
                    </AspectRatio>
                    <Center>
                      <Title order={4} c={"white"} pt={20}>
                        {_.upperCase(
                          listCandidate?.find(
                            (v) => v.id === selectedCandidate1
                          )?.name
                        )}
                      </Title>
                    </Center>
                  </Box>
                </Grid.Col>
                <Grid.Col md={6} lg={6}>
                  <Box>
                    <AspectRatio ratio={1 / 1}>
                      <BackgroundImage
                        radius={"md"}
                        w={200}
                        h={200}
                        src={
                          listCandidate?.find(
                            (v) => v.id === selectedCandidate2
                          )?.img
                        }
                      >
                        <AspectRatio
                          ratio={3 / 2}
                          sx={{
                            bottom: "-35%",
                            height: 20,
                            width: "100%",
                            backgroundColor: "#343a40",
                            borderTopLeftRadius: 10,
                            borderBottomLeftRadius: 10,
                            marginRight: 2,
                            marginLeft: 40,
                          }}
                        >
                          <Text
                            sx={{
                              display: "flex",
                              flex: 1,
                              alignContent: "center",
                            }}
                            fw={"bold"}
                            fz={{ lg: 10, md: 6, sm: 4 }}
                            color="white"
                          >
                            VICE PRESIDENT
                          </Text>
                        </AspectRatio>
                      </BackgroundImage>
                    </AspectRatio>
                    <Center pt={20}>
                      <Title order={4} c={"white"}>
                        {_.upperCase(
                          listCandidate?.find(
                            (v) => v.id === selectedCandidate2
                          )?.name
                        )}
                      </Title>
                    </Center>
                  </Box>
                </Grid.Col>
              </Grid>

              <Box
                pt={30}
                // pos={"sticky"}
                // top={447}
                // sx={{
                //   zIndex: 100,
                // }}
              >
                <Box>
                  <Group spacing={8} position="center">
                    <Text fz={23} fw={"bold"} color={COLOR.hijauTua}>
                      {t("common:p_success_probability")}
                    </Text>
                    <Text fs="italic" color={COLOR.hijauTua} fz={23}>
                      {t("common:p_projection")}
                    </Text>
                  </Group>
                </Box>
                <Box pt={10}>
                  <Box
                    sx={{
                      backgroundColor: COLOR.hijauTua,
                      borderRadius: 10,
                    }}
                  >
                    <Text ta={"center"} fw={"bold"} fz={60} color="white">
                      {listEmotion && listEmotion.length > 0 && listData && (
                        <>{listData![0].rate}%</>
                      )}
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid.Col>
          <Grid.Col md={7} lg={7}>
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
              <Box>
                {listEmotion &&
                  listEmotion.map((v, i) => (
                    <Box key={i}>
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
                    </Box>
                  ))}
              </Box>
            </InfiniteScroll>
          </Grid.Col>
        </Grid>
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
  const [nDataAudience, setDataAudience] = useAtom(dataAudience);
  const { t, lang } = useTranslate();
  const locked = nDataAudience
    .filter((itm) => itm.id == Number(provinceId))
    .map((itm) => Number(itm.total));
  const filtered = nDataAudience
    .filter((itm) => itm.id == Number(provinceId))
    .map((itm) =>
      _.sum([
        itm.trust,
        itm.joy,
        itm.surprise,
        itm.anticipation,
        itm.sadness,
        itm.fear,
        itm.anger,
        itm.disgust,
      ])
    );
  const option: EChartsOption = {
    // radiusAxis: {},
    // polar: {},
    // angleAxis: {
    //   type: "category",
    //   // data: _.keys(lsData ?? []),
    //   data: !lsData
    //     ? []
    //     : [
    //         t("common:trust"),
    //         t("common:joy"),
    //         t("common:surprise"),
    //         t("common:anticipation"),
    //         t("common:sadness"),
    //         t("common:fear"),
    //         t("common:anger"),
    //         t("common:disgust"),
    //       ],
    //   startAngle: 75,
    // },
    // tooltip: {
    //   show: true,
    //   formatter: (a: any, b: any) => {
    //     return `
    //     <i>${_.upperCase(t("common:" + a.data.name))}</i>
    //     <h1>${a.value} %</h1>
    //     `;
    //   },
    // },
    // series: [
    //   {
    //     type: "bar",
    //     coordinateSystem: "polar",
    //     data: Object.keys(lsData ?? []).map(
    //       (v) =>
    //         ({
    //           name: v,
    //           value: lsData[v],
    //           itemStyle: {
    //             color:
    //               listEmotionColor.find((v2) => _.lowerCase(v2.name) == v)
    //                 ?.color ?? "gray",
    //           },
    //         } as any)
    //     ),
    //     itemStyle: {
    //       shadowBlur: 20,
    //       shadowOffsetX: 0,
    //       shadowColor: "rgba(0, 0, 0, 0.5)",
    //     },
    //     barWidth: 80,
    //   },
    // ],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      formatter: (a: any) => {
        return `
        <i>${_.upperCase(t("common:" + a[0].data.name))}</i>
        <h1>${a[0].data.value} %</h1>
        `;
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: [
          t("common:trust"),
          t("common:joy"),
          t("common:surprise"),
          t("common:anticipation"),
          t("common:sadness"),
          t("common:fear"),
          t("common:anger"),
          t("common:disgust"),
        ],
        axisTick: {
          alignWithLabel: true,
        },
        axisLabel: {
          color: "white",
          verticalAlign: "middle",
          rotate: 45,
          fontWeight: "bold",
        },
        nameTextStyle: {
          color: "#FFFFFF",
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          color: "white",
          fontWeight: "bold",
          formatter: (v: any) => {
            return `${v}%`;
          },
        },
      },
    ],
    series: [
      {
        // name: 'Direct',
        type: "bar",
        barWidth: "60%",
        color: "white",
        data: Object.keys(lsData ?? []).map(
          (v) =>
            ({
              name: v,
              value: lsData[v],
              itemStyle: {
                color:
                  listColorChart.find((v2) => _.lowerCase(v2.name) == v)
                    ?.color ?? "gray",
              },
            } as any)
        ),
      },
    ],
  };
  return (
    <>
      {/* {JSON.stringify(lsData)} */}
      {/* <Title c={"gray"}>{no}</Title> */}
      {/* <Stack align="center" p={20}>
        <Flex gap="md">
        </Flex>
      </Stack> */}
      <Stack mb={70}>
        <Title pl={15} color="white">
          {_.upperCase(provinceName)}
        </Title>
        <Box>
          <Group position="right" pr={40}>
            <Title c={"white"} fz={20}>
              SENTIMENT ANALYSIS
            </Title>
          </Group>
          <EChartsReact style={{ width: "100%", height: 600 }} option={option} />
        </Box>
        <Box pl={30}>
          <Group position="apart" spacing={"lg"}>
            <Group spacing={30}>
              <Stack align="center">
                <Text color={COLOR.merah}>LOCKED AUDIENCE</Text>
                <Title c={COLOR.hijauTua} fz={25} fw={700}>
                  {nDataAudience &&
                    Intl.NumberFormat("id-ID").format(Number(locked))}
                </Title>
              </Stack>
              <Stack align="center">
                <Text color={COLOR.merah}>FILTERED AUDIENCE</Text>
                <Title c={COLOR.hijauTua} fz={25} fw={700}>
                  {nDataAudience &&
                    Intl.NumberFormat("id-ID").format(Number(filtered))}
                </Title>
              </Stack>
            </Group>
          </Group>
        </Box>
      </Stack>
    </>
  );
};
