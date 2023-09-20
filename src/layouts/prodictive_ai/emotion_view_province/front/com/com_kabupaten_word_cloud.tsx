import { api } from "@/lib/api";
import { Box, Group, Paper, Text, Title, Tooltip } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import colors from "randomcolor";
import useTranslate from 'next-translate/useTranslation'
import Trs from "@/fun_load/trs";

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
      <Paper
        w={"100%"}
        shadow={"md"}
        p={"md"}
        h={290}
      // bg={stylesGradient1}
      >
        <Title align="center" order={3} c={"gray"}>
          {t('common:region_hot_issue')}
        </Title>
        {/* {JSON.stringify(listData)} */}
        <Box sx={{ overflow: "scroll" }} w={"100%"}>
          <Group p={0} spacing={0} align={"center"} position={"center"}>
            {listData?.map((v, i) => (
              // ini dulunya tooltip
              <Box key={Math.random()} >
                <Trs text={v.title} lang={lang}>
                  {(val: any) =>
                    <Text
                      fw={"bold"}
                      span
                      c={colors()}
                      m={0}
                      p={0}
                      size={Math.floor(v.value / 3)}
                    >
                      {val}
                    </Text>
                  }
                </Trs>
              </Box>

            ))}
          </Group>
        </Box>
      </Paper>
    </>
  );
}
