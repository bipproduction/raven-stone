import { gCandidate } from "@/g_state/g_candidate";
import { gSelectedView } from "@/g_state/g_dasboard";
import { gNationWideRating } from "@/g_state/g_nation_wide_rating";
import { ModelNationWideRating } from "@/model/nation_wide_rating";
import { Box, Flex, Image, Select, Text } from "@mantine/core";
import EChartsReact from "echarts-for-react";
import _ from "lodash";
import { useState } from "react";
import toast from "react-simple-toasts";

const NationChartItem = ({
  data,
  height,
}: {
  data: ModelNationWideRating;
  height: number;
}) => {
  const dataNya = _.omit(data, [
    "candidate1Id",
    "candidate2Id",
    "candidate1Name",
    "candidate2Name",
    "candidate1Img",
    "candidate2Img",
    "value",
  ]);
  const option = {
    // title: {
    //   text: "World Population",
    // },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    // legend: {},
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
      data: Object.keys(dataNya),
    },
    series: [
      {
        name: "2011",
        type: "bar",
        data: Object.values(dataNya),
      },
    ],
  };
  return (
    <>
      <EChartsReact
        style={{
          height: height,
          width: "100%",
        }}
        option={option}
      />
    </>
  );
};

const NationWideRating = () => {
  const [candidate1, setCandidate1] = useState<number>(1);
  const [candidate2, setCandidate2] = useState<number>(2);
  if (gSelectedView.value != "Nation Wide Rating")
    return <>{gSelectedView.value}</>;
  return (
    <>
      <Text>Mention Wide rating</Text>
      <Flex justify={"end"}>
        <Select
          onChange={(val) => {
            if (val && candidate2 == Number(val)) {
              toast("tidak mungkin satu menjadi dua");
              return;
            }
            setCandidate1(Number(val ?? "2"));
          }}
          placeholder={gCandidate.value.find((v) => v.id == candidate1)?.name}
          data={
            gCandidate.value.map((v) => ({
              label: v.name,
              value: v.id,
            })) as []
          }
        />
        <Select
          onChange={(val) => {
            if (val && candidate1 == Number(val)) {
              toast("tidak dimungkinkan satu menjadi dua");
              return;
            }
            setCandidate2(Number(val ?? "2"));
          }}
          placeholder={gCandidate.value.find((v) => v.id == candidate2)?.name}
          data={
            gCandidate.value.map((v) => ({
              label: v.name,
              value: v.id,
            })) as []
          }
        />
      </Flex>

      {gNationWideRating.value
        .filter(
          (v) => v.candidate1Id == candidate1 && v.candidate2Id == candidate2
        )
        .map((v, i) => (
          <Box key={i} w={"100%"}>
            <Flex p={"md"} direction={"row"} w={"100%"}>
              <Flex w={300} bg="blue">
                <Image src={v.candidate1Img} alt={v.candidate1Name} />
                <Image src={v.candidate2Img} alt={v.candidate2Name} />
              </Flex>
              <Box w={"100%"} h={500}>
                <NationChartItem data={v} height={500} />
              </Box>
            </Flex>
          </Box>
        ))}
    </>
  );
};

export default NationWideRating;
