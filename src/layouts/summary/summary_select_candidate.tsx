import { funcLoadTop10Province } from "@/fun_load/func_load_top_10_province";
import { funcLoadTop10District } from "@/fun_load/func_load_top_10_district";
import { sCandidate } from "@/s_state/s_candidate";
import { sListEmotion } from "@/s_state/s_list_emotion";
import { sSelectedCandidate } from "@/s_state/s_selected_candidate";
import { sSelectedEmotion } from "@/s_state/s_selected_emotion";
import { stylesGradientBlueWhite } from "@/styles/styles_gradient_blue_white";
import {
  ActionIcon,
  Avatar,
  Box,
  Center,
  Flex,
  Group,
  HoverCard,
  Image,
  Paper,
  Select,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useForceUpdate, useShallowEffect } from "@mantine/hooks";
import AnimateCssReact from "animate-css-reactjs";
import SummaryHoverInfo from "./summary_hover_info";
import _ from "lodash";
import { sTop10Province } from "@/s_state/s_top_10_province";
import { useState } from "react";
import { stylesRadial } from "@/styles/styles_radial";
import { MdFace } from "react-icons/md";

const SummarySelectCandidate = () => {
  const update = useForceUpdate();
  const [prosentase, setProsentase] = useState({
    positive: 0,
    neutral: 0,
    negative: 0,
  });

  useShallowEffect(() => {
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

    const result = {
      positive: Math.round(Math.min((positive / totalEmotions) * 100, 100)),
      neutral: Math.round(Math.min((neutral / totalEmotions) * 100, 100)),
      negative: Math.round(Math.min((negative / totalEmotions) * 100, 100)),
    };

    // console.log(result);
    if (!_.isEmpty(sTop10Province.value)) {
      setProsentase(result);
    }
  }, [sTop10Province.value, prosentase]);
  return (
    <>
      <Group position="apart" py={"lg"}>
        <Paper p={"md"} bg={stylesRadial.in_cyan_dark} shadow={"md"} w={300}>
          <Stack>
            {/* {JSON.stringify(prosentase)} */}
            <Flex>
              {[
                sCandidate.value.find((v) => v.id == 1),
                sCandidate.value.find((v) => v.id == 2),
                sCandidate.value.find((v) => v.id == 3),
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
            <Flex justify="center" align={"center"} >
              <Title align="center" color={"white"} order={3}>
                {_.upperCase(
                  sCandidate.value.find(
                    (v) => v.id == Number(sSelectedCandidate.value)
                  )?.name
                )}
              </Title>
              {/* <SummaryHoverInfo text="klik untuk melihat data kandidat" /> */}
            </Flex>
            <Flex py={"md"} justify={"space-between"}>
              <Paper
                w={70}
                radius={100}
                bg={"green"}
                sx={{
                  boxShadow: "0 0 2px 1px lightgreen",
                }}
              >
                <Center>
                  <Text c={"white"} fw={"bold"}>
                    {prosentase.positive} %
                  </Text>
                </Center>
              </Paper>
              <Paper
                w={70}
                radius={100}
                bg={"gray"}
                sx={{
                  boxShadow: "0 0 2px 1px lightgray",
                }}
              >
                <Center>
                  <Text c={"white"} fw={"bold"}>
                    {prosentase.neutral} %
                  </Text>
                </Center>
              </Paper>
              <Paper
                w={70}
                radius={100}
                bg={"red"}
                sx={{
                  boxShadow: "0 0 2px 1px red",
                }}
              >
                <Center>
                  <Text c={"white"} fw={"bold"}>
                    {prosentase.negative} %
                  </Text>
                </Center>
              </Paper>
            </Flex>
          </Stack>
          <Select
            placeholder={sSelectedEmotion.value}
            variant={"filled"}
            searchable
            icon={<MdFace />}
            // label={"sort emotion"}
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
          />
        </Paper>
        <Group position="right" align={"end"}>
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
        </Group>
      </Group>
    </>
  );
};

export default SummarySelectCandidate;
