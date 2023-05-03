import {
  Box,
  Button,
  Center,
  Flex,
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
import Typist from "react-typist";
import { useState } from "react";
import TextAnimation from "react-typing-dynamics";
import { api } from "@/lib/api";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { sCandidate } from "@/s_state/s_candidate";

export default function SwotAnalisys() {
  return (
    <>
      <Stack spacing={"lg"}>
        <PageTitle
          text="STRENGTH WEAKNESS OPPORTUNITY THREAT"
          title="SWOT ANALISYS"
        />
        {/* <Onprogress /> */}
        <Analisys />
      </Stack>
    </>
  );
}

function Onprogress() {
  return (
    <>
      <Stack w={"100%"} align="center" justify="center">
        <Text fz={24} fw={"bold"}>
          Data-Cleaning & Data-Stacking On Progress...
        </Text>
        <Flex gap={"md"}>
          <Text>Feature Deployment On </Text>
          <Text c={"red"} fw={"bold"}>
            May 5, 2023
          </Text>
        </Flex>
      </Stack>
    </>
  );
}

function Analisys() {
  const [show, setShow] = useState(false);
  const [listSwot, setListSwot] = useState<any>();
  const [candidateId, setCandidateId] = useState(1);
  const [listSingle, setListSingle] = useState<any[]>();
  const [listDouble, setlistDouble] = useState<any[]>();

  function loadData(candidateId: number) {
    fetch(api.apiSwotSwotContentGet + `?candidateId=${candidateId}`)
      .then((v) => v.json())
      .then((v) => {
        setListSwot(v);
        if (v) {
          const single = v.filter((v: any) => v.category === "single");
          const double = v.filter((v: any) => v.category === "double");

          setListSingle(single);
          setlistDouble(double);
        }
      });
  }

  useShallowEffect(() => {
    loadData(candidateId);
  }, []);

  return (
    <Stack>
      <Group position="right">
        <Select
          label={"select candidate"}
          size="xs"
          placeholder={
            sCandidate.value.find((v) => Number(v.id) == candidateId)?.name
          }
          data={
            sCandidate.value.map((v) => ({
              label: v.name,
              value: v.id,
            })) as any
          }
          onChange={(val) => {
            if (val) loadData(Number(val));
          }}
        />
      </Group>

      {listDouble?.map((v, i) => (
        <Stack key={i}>
          <Title>{v.name}</Title>
          {/* {JSON.stringify(v)} */}
          {!_.isEmpty(v.SwotAnalisys) &&
            (() => {
              const positive = _.groupBy(v.SwotAnalisys, "sentiment")[
                "positive"
              ];
              const negative = _.groupBy(v.SwotAnalisys, "sentiment")[
                "negative"
              ];
              return (
                <>
                  <SimpleGrid cols={2}>
                    <Paper p={"xs"} bg={"#343541"}>
                      <Stack>
                        <Text size={24} fw={"bold"} color="green">
                          POSITIVE
                        </Text>
                        <ScrollArea h={500} p={"xs"} bg={"#434654"} c={"white"}>
                          {positive && (
                            <TextAnimation
                              phrases={[
                                positive[_.random(0, positive.length - 1)]
                                  .content,
                              ]}
                              typingSpeed={30}
                              backspaceDelay={500}
                              eraseDelay={0}
                              errorProbability={0.1}
                              eraseOnComplete={false}
                              //   isSecure={true}
                            />
                          )}
                        </ScrollArea>
                      </Stack>
                    </Paper>
                    <Paper p={"xs"} bg={"#343541"}>
                      <Stack>
                        <Text size={24} fw={"bold"} color="red">
                          NEGATIVE
                        </Text>
                        <ScrollArea h={500} p={"xs"} bg={"#434654"} c={"white"}>
                          {negative && (
                            <TextAnimation
                              phrases={[
                                negative[_.random(0, negative.length - 1)]
                                  .content,
                              ]}
                              typingSpeed={200}
                              backspaceDelay={1000}
                              eraseDelay={0}
                              errorProbability={0.1}
                              eraseOnComplete={false}
                              //   isSecure={true}
                            />
                          )}
                        </ScrollArea>
                      </Stack>
                    </Paper>
                  </SimpleGrid>
                </>
              );
            })()}
        </Stack>
      ))}
      {listSingle?.map((v, i) => (
        <Stack key={i}>
          <Text>{v.name}</Text>
        </Stack>
      ))}
      {/* {JSON.stringify(listDouble)}
      {JSON.stringify(listSingle)} */}
    </Stack>
  );
}
