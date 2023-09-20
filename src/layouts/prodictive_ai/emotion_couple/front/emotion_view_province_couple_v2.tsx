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
  const [listData, setListData] = useState<any[] | null>(null)
  const styling = {
    backgroundImage: `url('${listCandidate?.find((v) => v.id === selectedCandidate1)?.img
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
      api.apiPredictiveAiV3NationWideRatingListDataGet + `?candidate1Id=${selectedCandidate1}&candidate2Id=${selectedCandidate2}&date=${moment().format("YYYY-MM-DD")}`
    )
      .then((v) => v.json())
      .then((v) => setListData(v))

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
      <PageSubTitle text1={t('common:p_regional')} text2={t('common:p_data_pairing')} />
      <Stack spacing="xl" pl={30} pr={30}>
        {/* <PageTitle
          title={_.upperCase(t('common:emotional_view_via_province_couple'))}
          text={_.upperCase(t('common:emotional_meters_brand_merger_simulation'))}
        /> */}
        {/* {JSON.stringify(listEmotion)} */}

        {/* raven */}
        <Box
          pos={"sticky"}
          top={60}
          sx={{
            zIndex: 100,
          }}
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
                  {t('common:select_regions')}
                </Text>
              }
              radius={8}
              sx={stylesRadial}
              icon={<MdSearch />}
            />
            <Select
              label={
                <Text fz={17} color="white" fw={"bold"}>
                  {t('common:candidate')} 1
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
                  {t('common:candidate')} 2
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

        <Grid gutter="lg" pt={50}>
          <Grid.Col md={5} lg={5}>
            <Grid
              pos={"sticky"}
              top={190}
              sx={{
                zIndex: 80,
              }}
            >
              <Grid.Col md={6} lg={6}>
                <Box mr={20}>
                  <Stack align="center">
                    <Box
                      sx={{
                        backgroundColor: "white",
                        padding: 1,
                        borderRadius: 10,
                      }}
                    >
                      {/* <Image
                      radius={10}
                      width={200}
                      height={200}
                      src={
                        listCandidate?.find((v) => v.id === selectedCandidate1)
                          ?.img
                      }
                      alt=""
                      
                    /> */}
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
                        <Box pt={160}>
                          <Grid>
                            <Grid.Col md={7} lg={7}>
                              <Box
                                sx={{
                                  backgroundColor: "#343A40",
                                  borderRadius: " 0px  15px  15px  0px ",
                                  padding: 2,
                                }}
                              >
                                <Text ml={30} fz={12} fw={700} color="white">
                                  {_.upperCase(t('common:president'))}
                                </Text>
                              </Box>
                            </Grid.Col>
                          </Grid>
                        </Box>
                      </BackgroundImage>
                    </Box>
                    <Title align="center" lineClamp={1} color="white" order={3}>
                      {_.upperCase(
                        listCandidate?.find((v) => v.id === selectedCandidate1)
                          ?.name
                      )
                      }
                    </Title>
                  </Stack>
                </Box>
              </Grid.Col>
              <Grid.Col md={6} lg={6}>
                <Box>
                  <Stack align="center">
                    <Box
                      sx={{
                        backgroundColor: "white",
                        padding: 1,
                        borderRadius: 10,
                      }}
                    >
                      {/* <Image
                      radius={10}
                      width={200}
                      height={200}
                      src={
                        listCandidate?.find((v) => v.id === selectedCandidate2)
                          ?.img
                      }
                      alt=""
                    /> */}
                      <BackgroundImage
                        radius={10}
                        style={{ width: 200, height: 200 }}
                        src={
                          listCandidate?.find(
                            (v) => v.id === selectedCandidate2
                          )?.img
                        }
                      >
                        <Box pt={160}>
                          <Grid>
                            <Grid.Col md={4} lg={4}></Grid.Col>
                            <Grid.Col md={8} lg={8}>
                              <Box
                                sx={{
                                  backgroundColor: "#343A40",
                                  borderRadius: " 15px 0px 0px 15px ",
                                  padding: 2,
                                }}
                              >
                                <Text ml={10} fz={12} fw={700} color="white">
                                  {_.upperCase(t('common:vice_president'))}
                                </Text>
                              </Box>
                            </Grid.Col>
                          </Grid>
                        </Box>
                      </BackgroundImage>
                    </Box>
                    <Title align="center" lineClamp={1} color="white" order={3}>
                      {_.upperCase(
                        listCandidate?.find((v) => v.id === selectedCandidate2)
                          ?.name
                      )
                      }
                    </Title>
                  </Stack>
                </Box>
              </Grid.Col>
            </Grid>

            <Box
              pt={30}
              pos={"sticky"}
              top={447}
              sx={{
                zIndex: 100,
              }}
            >
              <Box>
                <Group spacing={8} position="center">
                  <Text fz={23} fw={"bold"} color={COLOR.hijauTua}>
                    {t('common:p_success_probability')}
                  </Text>
                  <Text fs="italic" color={COLOR.hijauTua} fz={23}>
                    {t('common:p_projection')}
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
                    {listEmotion && listEmotion.length > 0 && listData && <>
                      {listData![0].rate}%
                    </>}
                  </Text>
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
              <Group position="center">
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
              </Group>
            </InfiniteScroll>
          </Grid.Col>
        </Grid>

        {/* {JSON.stringify(listEmotion)} */}
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
  const { t, lang } = useTranslate();
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
          t('common:trust'),
          t('common:joy'),
          t('common:surprise'),
          t('common:anticipation'),
          t('common:sadness'),
          t('common:fear'),
          t('common:anger'),
          t('common:disgust'),
        ],
        axisTick: {
          alignWithLabel: true,
        },
        axisLabel: {
          verticalAlign: "middle",
          rotate: 45,
        },
        nameTextStyle: {
          color: '#FFFFFF'
        }
      },
    ],
    yAxis: [
      {
        type: "value",
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
      <Stack mb={25}>
        <Title pl={15} color="white">
          {provinceName}
        </Title>

        <EChartsReact style={{ width: 600, height: 600 }} option={option} />
      </Stack>
    </>
  );
};
