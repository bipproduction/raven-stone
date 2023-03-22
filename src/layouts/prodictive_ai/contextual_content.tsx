import {
  Box,
  Divider,
  Flex,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import EChartsReact from "echarts-for-react";
import _ from "lodash";
import { MdArrowCircleUp } from "react-icons/md";
import list_contexttual_content from "./../../assets/contextual_content.json";

const listColorCentiment = [
  {
    name: "positive",
    color: "green",
  },
  {
    name: "neutral",
    color: "yellow",
  },
  {
    name: "negative",
    color: "red",
  },
];

const ContextualItemChart = ({ data }: { [key: string]: any }) => {
  const option = {
    // title: {
    //   text: "Referer of a Website",
    //   subtext: "Fake Data",
    //   left: "center",
    // },
    tooltip: {
      trigger: "item",
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
  return (
    <>
      <Text>Contextual Content</Text>
      {/* {JSON.stringify(list_contexttual_content)} */}
      <Stack>
        {list_contexttual_content.map((v) => (
          <Box key={v.title} pb={70}>
            <Stack>
              <Title c={"dark"}>{v.title}</Title>
              <Flex direction={"row"}>
                <MdArrowCircleUp color="green" size={24}/>
              <Title c={"teal.8"}>{Intl.NumberFormat("id-ID").format(v.audiences)}</Title>
              </Flex>
              <SimpleGrid cols={3}>
                {v.emotion.map((v2) => (
                  <Box key={v2.name}>
                    <Paper
                      p={"md"}
                      bg={
                        listColorCentiment.find((c) => c.name == v2.name)?.color
                      }
                    >
                      <Group position="apart">
                        <Title c={"white"} order={3}>{_.upperCase(v2.name)}</Title>
                        <Title c={"white"} order={3}>{v2.value}</Title>
                      </Group>
                      <Stack>
                        {v2.cluster.map((v3) => (
                          <Box key={v3.name}>
                            <Text c={"dark"} fw={"bold"}>{v3.name}</Text>
                            <Divider />
                            <ContextualItemChart data={v3.data} />
                          </Box>
                        ))}
                      </Stack>
                    </Paper>
                  </Box>
                ))}
              </SimpleGrid>
            </Stack>
          </Box>
        ))}
      </Stack>
    </>
  );
};

export default ContextualContent;
