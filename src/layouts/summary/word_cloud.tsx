import { gLiistWordCloud } from "@/g_state/g_word_cloud";
import { useHookstate } from "@hookstate/core";
import { Box, JsonInput, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import dynamic from "next/dynamic";
import { useState } from "react";

const Wc = dynamic(() => import("react-d3-cloud"), {
  ssr: false,
});

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

const WordCloud = () => {
  const listData = useHookstate(gLiistWordCloud);
  const [list, setlist] = useState<any[]>([]);

  useShallowEffect(() => {
    if (listData.value.length > 0) {
      localStorage.setItem("word_cloud", JSON.stringify(listData.value));
      setlist(listData.get() as any);
    } else {
      setlist(JSON.parse(localStorage.getItem("word_cloud") as any));
    }
  }, []);

  return (
    <>
      <Text>Word Cloud</Text>
      {/* {JSON.stringify(listData.value)} */}
      <Box pos={"static"}>
        <Wc data={list as any} />
      </Box>
    </>
  );
};

export default WordCloud;
