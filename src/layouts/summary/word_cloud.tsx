import { Box, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
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
  return (
    <>
      <Text>Word Cloud</Text>
      <Box>
        <Wc data={words} />
      </Box>
    </>
  );
};

export default WordCloud;
