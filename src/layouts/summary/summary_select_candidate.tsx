import { funcLoadTop10District } from "@/fun_load/func_load_top_10_district";
import { funcLoadTop10Province } from "@/fun_load/func_load_top_10_province";
import { sCandidate } from "@/s_state/s_candidate";
import { sListEmotion } from "@/s_state/s_list_emotion";
import { sSelectedCandidate } from "@/s_state/s_selected_candidate";
import { sSelectedEmotion } from "@/s_state/s_selected_emotion";
import { sTop10Province } from "@/s_state/s_top_10_province";
import { stylesRadial } from "@/styles/styles_radial";
import {
  ActionIcon,
  Avatar,
  Box,
  Center,
  Flex,
  Group,
  Paper,
  Select,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useForceUpdate, useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { useState } from "react";
import { MdFace } from "react-icons/md";
import useTranslate from "next-translate/useTranslation";
import PageSubTitle from "@/global/components/PageSubTitle";
import { api } from "@/lib/api";
import moment from "moment";

const SummarySelectCandidate = ({ id }: { id: any }) => {
  const update = useForceUpdate();
  const [listDataAll, setListDataAll] = useState();
  const [prosentase, setProsentase] = useState({
    positive: 0,
    neutral: 0,
    negative: 0,
  });
  const end = moment(new Date()).format("YYYY-MM-DD");
  const start = moment(new Date()).subtract(1, "days").format("YYYY-MM-DD");

  function loadDataNew({ candidate }: { candidate: any }) {
    if (!_.isUndefined(candidate)) {
      fetch(
        api.apiSummarySummaryTrenSentiment +
        `?start=${start}&end=${end}&candidateId=${id}`
      )
        .then((v) => v.json())
        .then((v) => {
          setListDataAll(v)
        })
    }
  }

  useShallowEffect(() => {
    loadDataNew({ candidate: id })
    const total = _.reduce(
      sTop10Province.value,
      (result, value) => {
        return {
          trust: result.trust + value.trust,
          joy: result.joy + value.joy,
          surprise: result.surprise + value.surprise,
          anticipation: result.anticipation + value.anticipation,
          sadness: result.sadness + value.sadness,
          fear: result.fear + value.fear,
          anger: result.anger + value.anger,
          disgust: result.disgust + value.disgust,
          value: result.value + value.value,
        };
      },
      {
        trust: 0,
        joy: 0,
        surprise: 0,
        anticipation: 0,
        sadness: 0,
        fear: 0,
        anger: 0,
        disgust: 0,
        value: 0,
      }
    );

    const positive = total.trust + total.joy + total.surprise;
    const neutral = total.anticipation;
    const negative = total.sadness + total.fear + total.anger + total.disgust;
    const totalEmotions = positive + neutral + negative;

    // const result = {
    //   positive: Math.round(Math.min((positive / totalEmotions) * 100, 100)),
    //   neutral: Math.round(Math.min((neutral / totalEmotions) * 100, 100)),
    //   negative: Math.round(Math.min((negative / totalEmotions) * 100, 100)),
    // };

    const result = {
      positive: Number(((positive / totalEmotions) * 100).toFixed(2)),
      neutral: Number(((neutral / totalEmotions) * 100).toFixed(2)),
      negative: Number(((negative / totalEmotions) * 100).toFixed(2)),
    };

    //console.log(result);
    if (!_.isEmpty(sTop10Province.value)) {
      setProsentase(result);
    }
  }, [sTop10Province.value, prosentase]);
  const { t, lang } = useTranslate();
  return (
    <>

      {/* New Design Rave Stone */}
      <Flex gap={"md"}>
        <Flex>
          {[sCandidate.value.find((e) => e.id == id)].map((v, i) => (
            <Box key={i}>
              <Box
              >
                <Avatar size={250} src={v?.img} />
              </Box>
              <Flex justify={"center"} pt={"sm"} align={"center"} gap={"xs"}>
                <Title order={2}>{v?.name}</Title>
                {/* <Text fz={30}>{v?.name.split("Prabowo")}</Text> */}
              </Flex>
            </Box>
          ))}
        </Flex>
        <Flex pt={"xs"}>
          {[sCandidate.value.map((e) => e.id == 1)].map((v, i) => (
            <Box key={i}>
              <Stack>
                <Paper h={60} w={150} bg={"green.6"} radius={"md"}>
                  <Center h={60}>
                    <Title c={"white"}>{listDataAll?.[0]['positive']} %</Title>
                  </Center>
                </Paper>
                <Paper h={60} w={150} bg={"white"} radius={"md"}>
                  <Center h={60}>
                    <Title c={"green.6"}>{listDataAll?.[0]['neutral']} %</Title>
                  </Center>
                </Paper>
                <Paper h={60} w={150} bg={"red.9"} radius={"md"}>
                  <Center h={60}>
                    <Title c={"white"}>{listDataAll?.[0]['negative']} %</Title>
                  </Center>
                </Paper>
              </Stack>
            </Box>
          ))}
        </Flex>
      </Flex>

      {/* <Group position="apart" py={"lg"}>
        <Paper
          p={"md"}

          shadow={"md"}
          w={400}
        >
          <Stack>

            <Flex align={"center"} justify={"center"}>
              {[
                sCandidate.value.find((v) => v.id == 1),
                // sCandidate.value.find((v) => v.id == 2),
                // sCandidate.value.find((v) => v.id == 3),
              ].map((v, i) => (
                <Box key={i} p={"sm"}>
                  <ActionIcon
                    radius={100}
                    size={63}
                    onClick={async () => {
                      // gSelectedCandidate.set(v!.id.toString());
                      sSelectedCandidate.value = v!.id.toString();
                      await funcLoadTop10District();
                      await funcLoadTop10Province();
                      update();
                    }}
                  >
                    <Avatar
                      size={63}
                      src={v?.img}
                      style={{
                        border:
                          Number(sSelectedCandidate.value) == v?.id
                            ? "4px solid yellow"
                            : "",
                        filter:
                          Number(sSelectedCandidate.value) == v?.id
                            ? "none"
                            : "grayscale(100%)",
                      }}
                    />
                  </ActionIcon>
                </Box>
              ))}
            </Flex>
            <Flex justify="center" align={"center"}>
              <Title align="center" order={3}>
                {_.upperCase(
                  sCandidate.value.find(
                    (v) => v.id == Number(sSelectedCandidate.value)
                  )?.name
                )}
              </Title>
            </Flex>
            <Flex py={"md"} justify={"space-between"} gap={"sm"}>
              <Paper
                w={100}
                radius={100}
                bg={"green"}
                sx={{
                  boxShadow: "0 0 2px 1px lightgreen",
                }}
              >
                <Center>
                  <Text

                    fw={"bold"}
                  >
                    {prosentase.positive} %
                  </Text>
                </Center>
              </Paper>
              <Paper
                w={100}
                radius={100}
                bg={"gray"}
                sx={{
                  boxShadow: "0 0 2px 1px lightgray",
                }}
              >
                <Center>
                  <Text

                    fw={"bold"}
                  >
                    {prosentase.neutral} %
                  </Text>
                </Center>
              </Paper>
              <Paper
                w={100}
                radius={100}
                bg={"red"}
                sx={{
                  boxShadow: "0 0 2px 1px red",
                }}
              >
                <Center>
                  <Text fw={"bold"}>{prosentase.negative} %</Text>
                </Center>
              </Paper>
            </Flex>
          </Stack>
          <Select
            placeholder={t("common:" + _.lowerCase(sSelectedEmotion.value))}
            variant={"filled"}
            radius={100}
            searchable
            icon={<MdFace />}
            // label={"sort emotion"}
            data={sListEmotion.value.map((v) => ({
              // label: v.name,
              label: t("common:" + _.lowerCase(v.name)),
              value: v.name,
            }))}
            onChange={async (val) => {
              if (val) {
                sSelectedEmotion.value = val;
                await funcLoadTop10District();
                await funcLoadTop10Province();
                update();
              }
            }}
          />
        </Paper>
        <Group position="right" align={"end"}> */}
      {/* <Select
            placeholder={sSelectedEmotion.value}
            variant={"filled"}
            searchable
            label={"sort emotion"}
            data={sListEmotion.value.map((v) => ({
              label: v.name,
              value: v.name,
            }))}
            onChange={async (val) => {
              if (val) {
                // sSelectedEmotion.set(val);
                sSelectedEmotion.value = val;
                await funcLoadTop10District();
                await funcLoadTop10Province();
                update();
              }
            }}
          /> */}
      {/* <HoverCard>
            <HoverCard.Target>
              <ActionIcon
                sx={{
                  border: "2px solid white",
                  borderRadius: "100px",
                }}
              >
                <Image src={"/icon_robot.svg"} alt={"icon"} width={24} />
              </ActionIcon>
            </HoverCard.Target>
            <HoverCard.Dropdown>
              <Stack>
                <Center>
                  <AnimateCssReact animation="bounce">
                    <Image width={100} src={"/icon_robot.svg"} alt={"icon"} />
                  </AnimateCssReact>
                </Center>
                <Text>Pilih atau sort Emotion Sesuai kebutuhan</Text>
              </Stack>
            </HoverCard.Dropdown>
          </HoverCard> */}
      {/* </Group>
      </Group> */}
    </>
  );
};

export default SummarySelectCandidate;
