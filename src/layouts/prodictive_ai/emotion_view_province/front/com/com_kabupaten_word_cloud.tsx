import { api } from "@/lib/api";
import {
  Box,
  Group,
  Paper,
  ScrollArea,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import colors from "randomcolor";
import useTranslate from "next-translate/useTranslation";
import Trs from "@/fun_load/trs";
import { COLOR } from "@/global/fun/color_global";

export function ComKabupatenWordCloud({ cityId }: { cityId: any }) {
  // console.log(data.cityId)
  const { t, lang } = useTranslate();
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
      <Box
        w={"100%"}
        p={"md"}
        h={290}
        sx={{
          backgroundColor: COLOR.merahTua,
          borderRadius: 10,
        }}
        // bg={stylesGradient1}
      >
        <Title order={3} c={"white"} pl={10}>
          REGIONS HOT ISSUE
        </Title>
        {/* {JSON.stringify(listData)} */}
        <Box sx={{ overflow: "scroll" }} w={"100%"} pt={15}>
          <Group p={0} spacing={0}>
            {listData?.map((v, i) => (
              // ini dulunya tooltip
              <Box key={Math.random()}>
                <ScrollArea
                  w={"100%"}
                  // c={"white"}
                >
                  <Trs text={v.title} lang={lang}>
                    {(val: any) => (
                      <Text span m={0} ml={10} color="white">
                        {val}
                      </Text>
                    )}
                  </Trs>
                </ScrollArea>
              </Box>
            ))}
          </Group>
        </Box>
      </Box>
    </>
  );
}
