import {
  Box,
  Flex,
  Grid,
  Group,
  Image,
  Paper,
  ScrollArea,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import PageTitle from "../page_title";
import { sCandidate } from "@/s_state/s_candidate";
import { sSelectedCandidate } from "@/s_state/s_selected_candidate";
import { useShallowEffect, useTimeout } from "@mantine/hooks";
import { api } from "@/lib/api";
import { useState } from "react";
import _ from "lodash";
// import AIWriter from "react-aiwriter";
import parse from "html-react-parser";
import TextAnimation from "react-typing-dynamics";
import { ViewGlobalAccessBlock } from "@/global/view/access_block";
import Trs from "@/fun_load/trs";
import useTranslate from "next-translate/useTranslation";
import PageSubTitle from "@/global/components/PageSubTitle";
import { useAtom } from "jotai";

export default function StepAnalisys() {
  const [stepDataList, setStepDataList] = useState<{ [key: string]: any }>();
  const { t, lang } = useTranslate();

  useShallowEffect(() => {
    sSelectedCandidate.subscribe((v) => {
      loadData();
    });
  }, []);

  function loadData() {
    fetch(
      api.apiStepStepAnalisysDataGet +
        `?candidateId=${sSelectedCandidate.value}`
    )
      .then((v) => v.json())
      .then(setStepDataList);
  }

  return (
    <>
      <PageSubTitle
        text1={t("common:p_step")}
        text2={t("common:p_assessment")}
      />
      <Stack spacing={"md"} pl={30} pr={30}>
        {/* <PageTitle
        text={_.upperCase(t('common:social_technology_economic_politic_analysis'))}
        title={_.upperCase(t('common:step_analysis'))}
      /> */}
        {/* <Text size={12}>{_.upperCase(t("common:candidate_to_analize"))}</Text> */}
        <Grid gutter="lg">
          <Grid.Col md={2} lg={2} pt={30}>
            <Box
              pos={"sticky"}
              top={40}
              sx={{
                zIndex: 100,
                backgroundColor: "#230D38",
                padding: 5,
              }}
            >
              <Box
              // sx={{
              //   backgroundColor: "white",
              //   padding: 1,
              //   borderRadius: 10,
              // }}
              >
                <Image
                  alt="image"
                  src={
                    sCandidate.value.find(
                      (v) => Number(v.id) == Number(sSelectedCandidate.value)
                    )?.img
                  }
                  radius={10}
                />
              </Box>
              <Group pt={20}>
                <Select
                  label={
                    <Text fz={17} color="white">
                      {t("common:select_candidate")}
                    </Text>
                  }
                  placeholder={
                    sCandidate.value.find(
                      (v) => Number(v.id) == Number(sSelectedCandidate.value)
                    )?.name
                  }
                  size="xs"
                  data={sCandidate.value.map(
                    (v) =>
                      ({
                        label: v.name,
                        value: v.id,
                      } as any)
                  )}
                  onChange={(val) => {
                    if (val) {
                      sSelectedCandidate.value = val;
                    }
                  }}
                  w={350}
                />
              </Group>
            </Box>
          </Grid.Col>
          <Grid.Col md={10} lg={10}>
            <Box pl={20}>
              <Stack>
                {_.isEmpty(stepDataList) ? (
                  <Text color={"white"}></Text>
                ) : (
                  <Stack>
                    {_.keys(stepDataList).map((v, i) => (
                      <Stack key={i}>
                        <Title color={"white"} pt={20}>
                          <Trs text={_.upperCase(v)} lang={lang}>
                            {(val: any) => <div>{val}</div>}
                          </Trs>
                        </Title>
                        <SimpleGrid cols={2}>
                          <Box>
                            <Stack spacing={"lg"}>
                              <Text color="green" fw={"bold"} fz={24}>
                                {_.upperCase(t("common:positive"))}
                              </Text>
                              {(() => {
                                const datanya = _.groupBy(
                                  stepDataList[v],
                                  (v3) => v3.sentiment
                                )["positive"];

                                if (!datanya) return <></>;

                                return (
                                  <>
                                    <ScrollArea
                                      h={400}
                                      // bg={"#434654"}
                                      w={"100%"}
                                      // c={"white"}
                                    >
                                      <Trs
                                        text={
                                          datanya[
                                            _.random(0, datanya.length - 1)
                                          ].data
                                        }
                                        lang={lang}
                                      >
                                        {(val: any) => (
                                          <TextAnimation
                                            key={Math.random()}
                                            phrases={[val]}
                                            typingSpeed={10}
                                            backspaceDelay={500}
                                            eraseDelay={0}
                                            errorProbability={0.1}
                                            eraseOnComplete={false}
                                            //   isSecure={true}
                                          />
                                        )}
                                      </Trs>
                                    </ScrollArea>
                                  </>
                                );
                              })()}
                            </Stack>
                          </Box>
                          <Box>
                            <Stack spacing={"lg"}>
                              <Text color="red" fw={"bold"} fz={24} pl={20}>
                                {_.upperCase(t("common:negative"))}
                              </Text>
                              {(() => {
                                const datanya = _.groupBy(
                                  stepDataList[v],
                                  (v3) => v3.sentiment
                                )["negative"];

                                if (!datanya) return <></>;

                                return (
                                  <>
                                    <ScrollArea
                                      h={400}
                                      // bg={"gray"}
                                      w={"100%"}
                                      // c={"white"}
                                      ml={20}
                                    >
                                      <Trs
                                        text={
                                          datanya[
                                            _.random(0, datanya.length - 1)
                                          ].data
                                        }
                                        lang={lang}
                                      >
                                        {(val: any) => (
                                          <TextAnimation
                                            key={Math.random()}
                                            phrases={[val]}
                                            typingSpeed={10}
                                            backspaceDelay={100}
                                            eraseDelay={0}
                                            errorProbability={0.1}
                                            eraseOnComplete={false}
                                          />
                                        )}
                                      </Trs>
                                    </ScrollArea>
                                  </>
                                );
                              })()}
                            </Stack>
                          </Box>
                        </SimpleGrid>
                      </Stack>
                    ))}
                  </Stack>
                )}
              </Stack>
            </Box>
          </Grid.Col>
        </Grid>

        {/* {JSON.stringify(stepDataList)} */}
      </Stack>
    </>
  );
}
