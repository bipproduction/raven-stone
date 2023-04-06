// import { gSelectedView } from "@/g_state/g_selected_view";
import { stylesGradient1 } from "@/styles/styles_gradient_1";
import { stylesGradientCentiment } from "@/styles/styles_gradient_bg_centiment";
import { stylesGradientBluegray } from "@/styles/styles_gradient_blue_gray";
import { stylesGradientBlueWhiteTop } from "@/styles/styles_gradient_blue_white_top";
import { stylesGradientMixYellowRed } from "@/styles/styles_gradient_mix_yellow_red";
import { sContextualContent } from "@/s_state/s_contextual_content";
import { sSelectedView } from "@/s_state/s_selected_view";
import {
  Box,
  Chip,
  Divider,
  Flex,
  Group,
  Paper,
  SimpleGrid,
  Spoiler,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { EChartsOption } from "echarts";
import EChartsReact from "echarts-for-react";
import _ from "lodash";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { MdArrowCircleUp } from "react-icons/md";
import PageTitle from "../page_title";
// import list_contexttual_content from "./../../assets/contextual_content.json";

const listColorCentiment = [
  {
    name: "positive",
    color: stylesGradientCentiment.green,
  },
  {
    name: "neutral",
    color: stylesGradientCentiment.gray,
  },
  {
    name: "negative",
    color: stylesGradientCentiment.red,
  },
];

const ContextualItemChart = ({ data }: { [key: string]: any }) => {
  const option: EChartsOption = {
    // title: {
    //   text: "Referer of a Website",
    //   subtext: "Fake Data",
    //   left: "center",
    // },
    tooltip: {
      trigger: "item",
      formatter: (a: any) => {
        return `
        <i>${_.upperCase(a.name)}</i>
        <h1>${a.value} %</h1>
        `;
      },
    },
    // legend: {
    //   orient: "vertical",
    //   left: "left",
    // },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: "50%",
        data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return (
    <>
      <EChartsReact option={option} />
    </>
  );
};

const ContextualContent = () => {
  if (sSelectedView.value != "Contextual Content")
    return <>${sSelectedView.value}</>;
  return (
    <>
      {/* <Title c={"cyan.8"}>{_.upperCase(gSelectedView.value)}</Title> */}
      <PageTitle text="PREDICTIVE CONTEXTUAL CONVERSATION" />
      <Divider mb={70} />
      {/* {JSON.stringify(list_contexttual_content)} */}
      <Stack>
        {sContextualContent.value.map((v) => (
          <Paper key={v.id} p={"md"} radius={20} shadow="md">
            <Spoiler
              maxHeight={42}
              key={v.data.title}
              showLabel={"show"}
              hideLabel={"hide"}
            >
              <Box key={v.data.title} pb={70}>
                <Stack>
                  <Group>
                    <Title order={3} c={"dark"}>
                      {v.data.title}
                    </Title>
                    <Flex direction={"row"}>
                      <MdArrowCircleUp color="green" size={24} />
                      <Title order={3} c={"green"}>
                        {Intl.NumberFormat("id-ID").format(v.data.audiences)}
                      </Title>
                    </Flex>
                  </Group>
                  <SimpleGrid cols={3}>
                    {v.data.emotion.map((v2) => (
                      <Box key={v2.name}>
                        <Box
                          // shadow={"xs"}
                          p={"md"}
                          // bg={
                          //   listColorCentiment.find((c) => c.name == v2.name)
                          //     ?.color
                          // }
                        >
                          <Chip my={"sm"}>
                            <Group position="apart">
                              <Title c={"gray"} order={3}>
                                {_.upperCase(v2.name)}
                              </Title>
                              <Title c={"gray"} order={3}>
                                {v2.value + " %"}
                              </Title>
                            </Group>
                          </Chip>
                          <Stack>
                            {v2.cluster.map((v3, i) => (
                              <AnimationOnScroll
                                key={i}
                                initiallyVisible={true}
                                animateIn={
                                  [
                                    "animate__slideInLeft",
                                    "animate__slideInRight",
                                  ][_.random(0, 1)]
                                }
                              >
                                <Paper
                                  p={"md"}
                                  key={v3.name}
                                  shadow={"md"}
                                  bg={
                                    listColorCentiment.find(
                                      (c) => c.name == v2.name
                                    )?.color
                                  }
                                >
                                  <Text c={"dark"} fw={"bold"}>
                                    {_.upperCase(v3.name)}
                                  </Text>
                                  <Divider />
                                  <ContextualItemChart data={v3.data} />
                                </Paper>
                              </AnimationOnScroll>
                            ))}
                          </Stack>
                        </Box>
                      </Box>
                      // <AnimationOnScroll
                      //   key={v2.name}
                      //   initiallyVisible={true}
                      //   animateIn={
                      //     ["animate__slideInLeft", "animate__slideInRight"][
                      //       _.random(0, 1)
                      //     ]
                      //   }
                      // >
                      // </AnimationOnScroll>
                    ))}
                  </SimpleGrid>
                </Stack>
              </Box>
            </Spoiler>
          </Paper>
        ))}
      </Stack>
    </>
  );
};

export default ContextualContent;
