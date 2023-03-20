import { gLiistWordCloud } from "@/g_state/g_word_cloud";
import { useHookstate } from "@hookstate/core";
import {
  Box,
  Card,
  Flex,
  Group,
  JsonInput,
  ScrollArea,
  Text,
  Tooltip,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { EChartsOption } from "echarts";
import EChartsReact from "echarts-for-react";
import _ from "lodash";
import dynamic from "next/dynamic";
import { useState } from "react";
import randomcolor from "randomcolor";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { gSelectedView } from "@/g_state/g_dasboard";

const words = [
  {
    text: "told",
    value: 64,
  },
  {
    text: "mistake",
    value: 11,
  },
  {
    text: "thought",
    value: 16,
  },
  {
    text: "bad",
    value: 17,
  },
];

const listNya = [
  {
    name: "AnalyserNode",
    value: 1,
    category: 4,
  },
  {
    name: "AudioNode",
    value: 1,
    category: 4,
  },
  {
    name: "Uint8Array",
    value: 1,
    category: 4,
  },
  {
    name: "Float32Array",
    value: 1,
    category: 4,
  },
];

const WordCloud = () => {
  const listData = useHookstate(gLiistWordCloud);
  const [list, setlist] = useState<any[]>([]);
  const selectedPage = useHookstate(gSelectedView);

  useShallowEffect(() => {
    if (listData.value.length > 0) {
      localStorage.setItem("word_cloud", JSON.stringify(listData.value));
      setlist(listData.get() as any);
    } else {
      setlist(JSON.parse(localStorage.getItem("word_cloud") as any));
    }
  }, []);

  if (selectedPage.value != "Word Cloud") return <></>;

  return (
    <>
      <Text>Word Cloud</Text>
      {/* {JSON.stringify(listData.value)} */}
      <Box pos={"static"}>{/* {JSON.stringify(list)} */}</Box>

      <Card>
        <Flex wrap={"wrap"} direction={"row"}>
          {listData.value.map((v, i) => {
            const nilai = Math.floor(v.value / 8);
            return (
              <Tooltip key={v.text} label={v.text}>
                <Text
                  color={randomcolor()}
                  size={nilai}
                  fw={nilai > 20 ? "bold" : "normal"}
                >
                  {nilai > 20 ? _.upperCase(v.text) : v.text}
                  {/* {nilai} */}
                </Text>
              </Tooltip>
            );
          })}
        </Flex>
      </Card>
    </>
  );
};

export default WordCloud;
