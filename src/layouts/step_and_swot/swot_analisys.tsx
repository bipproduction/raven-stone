import {
  ActionIcon,
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
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import Trs from "@/fun_load/trs";
import useTranslate from 'next-translate/useTranslation'
import  { PageSubTitle } from "@/global/components/PageSubTitle";

export default function SwotAnalisys() {
  const { t, lang } = useTranslate()
  return (
    <>
      <Stack spacing={"lg"}>
        {/* <PageTitle
          text={_.upperCase(t('common:strength_weakness_opportunity_threat'))}
          title={_.upperCase(t('common:swot_analysis'))}
        /> */}
      <PageSubTitle text1="SWOT" text2="EVALUATION"/>

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
  // const [show, setShow] = useState(false);
  // const [listSwot, setListSwot] = useState<any>();
  const [candidateId, setCandidateId] = useState(1);
  const [listSingle, setListSingle] = useState<any[]>();
  const [listDouble, setlistDouble] = useState<any[]>();

  function loadData(candidateId: number) {
    fetch(api.apiSwotSwotContentGet + `?candidateId=${candidateId}`)
      .then((v) => v.json())
      .then(async (v) => {
        // setListSwot(v);
        if (v) {
          const single = v.filter((v: any) => v.category === "single");
          const double = v.filter((v: any) => v.category === "double");

          setListSingle([]);
          setlistDouble([]);

          // wait 1 second
          await new Promise((r) => setTimeout(r, 1));

          setListSingle(single);
          setlistDouble(double);
        }
      });
  }

  useShallowEffect(() => {
    loadData(candidateId);
  }, []);
  const { t, lang } = useTranslate()
  return (
    <Stack spacing={"lg"}>
      <Group position="right">
        <Select
          label={t('common:select_candidate')}
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

      <SimpleGrid cols={2}>
        {listDouble?.map((v, i) => (
          <Paper
            key={i}
            p={"md"}
          // bg={v.sentiment == "positive" ? "green.1" : "red.1"}
          >
            <Stack>
              {/* {JSON.stringify(v)} */}
              <Title order={3} c={v.sentiment == "positive" ? "green" : "red"}>
                <Trs text={_.upperCase(v.name)} lang={lang}>
                  {(val: any) => <div>{val}</div>}
                </Trs>
              </Title>
              {/* {JSON.stringify(v)} */}
              {!_.isEmpty(v.SwotAnalisys) && (
                <ScrollArea
                  p={"md"}
                  // bg={"white"}
                  h={300}
                // c={"gray"}
                >
                  <Trs text={v.SwotAnalisys[_.random(0, v.SwotAnalisys.length - 1)]
                    .content} lang={lang}>
                    {(val: any) => <>
                      {val && <TextAnimation
                        phrases={[
                          val,
                        ]}
                        typingSpeed={10}
                        backspaceDelay={500}
                        eraseDelay={0}
                        errorProbability={0.1}
                        eraseOnComplete={false}
                      //   isSecure={true}
                      />}

                    </>}
                  </Trs>
                </ScrollArea>
              )}
            </Stack>
          </Paper>
        ))}
      </SimpleGrid>
      <SingleView listSingle={listSingle} />
    </Stack>
  );
}

function SingleView({ listSingle }: { listSingle: any[] | undefined }) {
  const [selected, setSelected] = useState(0);
  const [text, setText] = useState<string | undefined>(undefined);

  useShallowEffect(() => {
    if (listSingle && listSingle.length > 0) {
      if (listSingle[0].SwotAnalisys.length > 0) {
        setText(listSingle[0].SwotAnalisys[0].content);
      }
    }
  }, [listSingle]);
  const { t, lang } = useTranslate()
  return (
    <>
      {listSingle?.map((v, i) => (
        <Stack key={i} spacing={0}>
          <Title c={"green"}>
            <Trs text={v.name} lang={lang}>
              {(val: any) => <div>{val}</div>}
            </Trs>
          </Title>
          {v.SwotAnalisys.length > 0 && (
            <Stack>
              <Paper
                p={"md"}
              // bg={"green.2"}
              >
                <Flex>
                  <Box p={"md"}>
                    <Flex>
                      <ActionIcon
                        onClick={async () => {
                          if (selected > 0) {
                            setText(undefined);
                            // await
                            await new Promise((r) => setTimeout(r, 1));
                            setSelected(selected - 1);
                            setText(v.SwotAnalisys[selected - 1].content);
                          }
                        }}
                      >
                        <MdArrowBackIos />
                      </ActionIcon>
                      <Text>{selected + 1}</Text>
                      <Text>/</Text>
                      <Text>{v.SwotAnalisys.length}</Text>
                      <ActionIcon
                        onClick={async () => {
                          if (selected < v.SwotAnalisys.length - 1) {
                            setText(undefined);
                            // await
                            await new Promise((r) => setTimeout(r, 1));
                            setSelected(selected + 1);
                            setText(v.SwotAnalisys[selected + 1].content);
                          }
                        }}
                      >
                        <MdArrowForwardIos />
                      </ActionIcon>
                    </Flex>
                  </Box>
                  <ScrollArea
                    h={300}
                    p={"xs"}
                    // bg={"white"}
                    // c={"gray"}
                    w={"100%"}
                  >
                    {text == undefined ? (
                      <Stack>
                        <Text>...</Text>
                      </Stack>
                    ) : (
                      <Trs text={text} lang={lang}>
                        {(val: any) =>

                          <>{val &&
                            <TextAnimation
                              phrases={[val]}
                              typingSpeed={10}
                              backspaceDelay={500}
                              eraseDelay={0}
                              errorProbability={0.1}
                              eraseOnComplete={false}
                            />
                          }
                          </>
                        }
                      </Trs>

                      // <TextAnimation
                      //   phrases={[text!]}
                      //   typingSpeed={10}
                      //   backspaceDelay={500}
                      //   eraseDelay={0}
                      //   errorProbability={0.1}
                      //   eraseOnComplete={false}
                      // />
                    )}
                  </ScrollArea>
                </Flex>
              </Paper>
            </Stack>
          )}
        </Stack>
      ))}
    </>
  );
}
