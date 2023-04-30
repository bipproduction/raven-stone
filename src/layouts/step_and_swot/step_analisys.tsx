import {
  Box,
  Flex,
  Group,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import PageTitle from "../page_title";
import { sCandidate } from "@/s_state/s_candidate";
import { sSelectedCandidate } from "@/s_state/s_selected_candidate";
import { useShallowEffect } from "@mantine/hooks";
import { api } from "@/lib/api";
import { useState } from "react";
import _ from "lodash";
import AIWriter from "react-aiwriter";
import parse from "html-react-parser";

export default function StepAnalisys() {
  const [stepDataList, setStepDataList] = useState<{ [key: string]: any }>();

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
      <PageTitle
        text="SOSIAL TECHNOLOGY ECONOMIC POLITIC ANALISYS"
        title="STEP ANALISYS"
      />
      <Group position="right">
        <Text size={12}>CANDIDATE TO ANALISYS</Text>
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
                <Title color={"blue"}>{_.upperCase(v)}</Title>
                <SimpleGrid cols={2} bg={"blue.0"} p={"md"} w={"100%"}>
                  <Paper p={"xs"} w={"100%"}>
                    <Stack spacing={"lg"}>
                      <Text color="green" fw={"bold"} fz={24}>
                        POSITIVE
                      </Text>
                      {(() => {
                        const datanya = _.groupBy(
                          stepDataList[v],
                          (v3) => v3.sentiment
                        )["positive"];

                        if (!datanya) return <></>;

                        return (
                          <>
                            <Box p={"xs"} bg={"gray.1"} w={"100%"}>
                              <AIWriter {...{ delay: 200 }}>
                                {parse(
                                  datanya[_.random(0, datanya.length - 1)].data
                                )}
                              </AIWriter>
                            </Box>
                          </>
                        );
                      })()}
                    </Stack>
                  </Paper>
                  <Paper p={"xs"} w={"100%"}>
                    <Stack spacing={"lg"}>
                      <Text color="red" fw={"bold"} fz={24}>
                        NEGATIVE
                      </Text>
                      {(() => {
                        const datanya = _.groupBy(
                          stepDataList[v],
                          (v3) => v3.sentiment
                        )["negative"];

                        if (!datanya) return <></>;

                        return (
                          <>
                            <Box p={"xs"} bg={"gray.1"} w={"100%"}>
                              <AIWriter {...{ delay: 300 }}>
                                {parse(
                                  datanya[_.random(0, datanya.length - 1)].data
                                )}
                              </AIWriter>
                            </Box>
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
