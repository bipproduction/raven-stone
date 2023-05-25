import { api } from "@/lib/api";
import { Box, Group, Paper, Text, Title, Tooltip } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import colors from "randomcolor";

export function ComKabupatenWordCloud({ cityId }: { cityId: any }) {
  // console.log(data.cityId)
  const [listData, setlistData] = useState<any[]>();
  useShallowEffect(() => {
    fetch(api.apiPredictiveAiWordCloudGet + `?cityId=${cityId}`)
      .then((v) => v.json())
      .then((v) => {

        if (v) {
          setlistData(v.data.content);
        }
      });
  }, []);

  return (
    <>
      <Paper
        w={"100%"}
        shadow={"md"}
        p={"md"}
        h={290}
        // bg={stylesGradient1}
      >
        <Title align="center" order={3} c={"gray"}>
          Regions Hot Issue{" "}
        </Title>
        {/* {JSON.stringify(listData)} */}
        <Box sx={{ overflow: "scroll" }}>
          <Group p={0} spacing={0} align={"center"} position={"center"}>
            {listData?.map((v, i) => (
              <Tooltip key={Math.random()} label={v.title}>
                <Text
                  fw={"bold"}
                  span
                  c={colors()}
                  m={0}
                  p={0}
                  size={Math.floor(v.value / 3)}
                >
                  {v.title}
                </Text>
              </Tooltip>
            ))}
          </Group>
        </Box>
      </Paper>
    </>
  );
}
