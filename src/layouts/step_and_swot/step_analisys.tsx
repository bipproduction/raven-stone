import {
  Box,
  Flex,
  Group,
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
import useTranslate from 'next-translate/useTranslation'
import PageSubTitle from "@/global/components/PageSubTitle";


export default function StepAnalisys() {
  const [stepDataList, setStepDataList] = useState<{ [key: string]: any }>();
  const { t, lang } = useTranslate()


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
    <Stack spacing={"md"}>
      {/* <PageTitle
        text={_.upperCase(t('common:social_technology_economic_politic_analysis'))}
        title={_.upperCase(t('common:step_analysis'))}
      /> */}
      <PageSubTitle text1="STEP" text2="ASSESEMENT"/>
      <Group position="right">
        <Text size={12}>{_.upperCase(t('common:candidate_to_analize'))}</Text>
        <Select
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
        />
      </Group>
      {/* {JSON.stringify(stepDataList)} */}
      <Stack spacing={"lg"}>
        {_.isEmpty(stepDataList) ? (
          <Text color={"blue"}></Text>
        ) : (
          <Stack spacing={"lg"}>
            {_.keys(stepDataList).map((v, i) => (
              <Stack key={i} spacing={"lg"}>
                <Title color={"blue"}>
                  <Trs text={_.upperCase(v)} lang={lang} >
                    {(val: any) => <div>{val}</div>}
                  </Trs>
                </Title>
                <SimpleGrid cols={2} p={"md"} w={"100%"}>
                  <Paper
                    p={"xs"}
                    w={"100%"}
                    h={500}
                    // bg={"#343541"}
                    shadow="sm"
                  >
                    <Stack spacing={"lg"}>
                      <Text color="green" fw={"bold"} fz={24}>
                        {_.upperCase(t('common:positive'))}
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
                              p={"xs"}
                              h={400}
                              // bg={"#434654"}
                              w={"100%"}
                            // c={"white"}
                            >
                              {/* <AIWriter {...{ delay: 200 }}>
                                {parse(
                                  datanya[_.random(0, datanya.length - 1)].data
                                )}
                              </AIWriter> */}

                              <Trs text={datanya[_.random(0, datanya.length - 1)]
                                .data} lang={lang} >
                                {(val: any) =>
                                  <TextAnimation
                                    key={Math.random()}
                                    phrases={[
                                      val,
                                    ]}
                                    typingSpeed={10}
                                    backspaceDelay={500}
                                    eraseDelay={0}
                                    errorProbability={0.1}
                                    eraseOnComplete={false}
                                  //   isSecure={true}
                                  />
                                }
                              </Trs>
                            </ScrollArea>
                          </>
                        );
                      })()}
                    </Stack>
                  </Paper>
                  <Paper
                    p={"xs"}
                    w={"100%"}
                    // bg={"#343541"}
                    shadow="sm"
                  >
                    <Stack spacing={"lg"}>
                      <Text color="red" fw={"bold"} fz={24}>
                        {_.upperCase(t('common:negative'))}
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
                              p={"xs"}
                              h={400}
                              // bg={"gray"}
                              w={"100%"}
                            // c={"white"}
                            >
                              <Trs text={datanya[_.random(0, datanya.length - 1)]
                                .data} lang={lang}>
                                {(val:any) =>
                                  <TextAnimation
                                    key={Math.random()}
                                    phrases={[
                                      val,
                                    ]}
                                    typingSpeed={10}
                                    backspaceDelay={100}
                                    eraseDelay={0}
                                    errorProbability={0.1}
                                    eraseOnComplete={false}
                                  />
                                }
                              </Trs>
                            </ScrollArea>
                          </>
                        );
                      })()}
                    </Stack>
                  </Paper>
                </SimpleGrid>
              </Stack>
            ))}
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
