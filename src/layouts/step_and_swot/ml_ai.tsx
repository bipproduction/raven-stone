import {
  ActionIcon,
  Box,
  Center,
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
import _ from "lodash";
import useTranslate from "next-translate/useTranslation";
import PageSubTitle from "@/global/components/PageSubTitle";
import { useState } from "react";
import { useShallowEffect } from "@mantine/hooks";
import Trs from "@/fun_load/trs";
import { MdArrowBackIos, MdArrowForwardIos, MdOutbox } from "react-icons/md";
import TextAnimation from "react-typing-dynamics";
import { api } from "@/lib/api";
import { sCandidate } from "@/s_state/s_candidate";
import { useAtom } from "jotai";
import { v3_val_nation_wide_rating_selected_candidate } from "../prodictive_ai/nation_wide_rating/val/v3_nation_wide_rating_selected_candidate";
import { v3_val_nation_wide_rating_list_candidate } from "../prodictive_ai/nation_wide_rating/val/v3_nation_wide_rating_list_candidate";
import { IconArrowBack, IconArrowLeft } from "@tabler/icons-react";
import { Button } from "antd";
import { Pagination } from '@mantine/core';

export default function Mlai() {
  const { t, lang } = useTranslate();
  return (
    <>
      <Stack spacing={"md"}>
        <PageSubTitle
          text1="ML-AI"
          text2={_.upperCase(t("common:prompt_recomendations"))}
        />
        <Analisys />
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
  const [selectedCandidate, setSelectedCandidate] = useAtom(
    v3_val_nation_wide_rating_selected_candidate
  );
  const [listCandidate, setListCandidate] = useAtom(
    v3_val_nation_wide_rating_list_candidate
  );

  async function loadData(cId: number) {
    setCandidateId(cId);
    await fetch(api.apiSwotSwotContentGet + `?candidateId=${cId}`)
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
  const { t, lang } = useTranslate();
  return (
    <Stack spacing={"md"} pl={30} pr={30} pt={4}>
      <Grid gutter="lg">
        <Grid.Col md={2} lg={2}>
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
            //   padding: 3,
            //   borderRadius: 10,
            // }}
            >
              <Image
                alt="image"
                src={
                  sCandidate.value.find((v) => Number(v.id) == candidateId)?.img
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
                size="xs"
                placeholder={
                  sCandidate.value.find((v) => Number(v.id) == candidateId)
                    ?.name
                }
                data={
                  sCandidate.value.map((v) => ({
                    label: v.name,
                    value: v.id,
                  })) as any
                }
                onChange={async (val) => {
                  if (val) loadData(Number(val));
                  await new Promise(r => setTimeout(r, 1));
                  await loadData(Number(val));
                }}
                w={350}
              />
            </Group>
          </Box>
        </Grid.Col>
        <Grid.Col md={10} lg={10}>
          <SingleV2 list_single={listSingle as any} />
          {/* <DoubleView list_double={listDouble} /> */}
          {/* {JSON.stringify(listDouble)} */}
          {/* <SingleView listSingle={listSingle} /> */}
        </Grid.Col>
      </Grid>
    </Stack>
  );
}


function SingleV2({ list_single }: { list_single: any[] }) {
  const [pointer, setPointer] = useState<number | null>(1)
  if (_.isEmpty(list_single)) return <></>
  return <>
    <Stack>
      {/* {JSON.stringify(list_single[0]['SwotAnalisys'].length)} */}
      <Pagination total={list_single[0]['SwotAnalisys'].length} onChange={(v) => {
        setPointer(null)
        setTimeout(() => {
          setPointer(v)
        }, 100)
      }} />
      <ScrollArea h={500} p={"md"} style={{
        backgroundColor: "rgba(0, 0, 0, .25)"
      }}>
        {pointer && !_.isEmpty(list_single) && !_.isEmpty(list_single[0]['SwotAnalisys']) && <Trs text={list_single[0]['SwotAnalisys'][pointer! - 1]['content']} lang={"eng"}>
          {(val: any) => (
            <>
              {val && (
                <TextAnimation
                  phrases={[val]}
                  typingSpeed={0}
                  backspaceDelay={0}
                  eraseDelay={0}
                  errorProbability={0.1}
                  eraseOnComplete={false}
                />
              )}
            </>
          )}
        </Trs>}
      </ScrollArea>

    </Stack>

  </>
}

function DoubleView({ list_double }: { list_double?: any[] }) {
  const [pointer, setPointer] = useState<number | null>(1)
  const [innerPointer, setInnerPointer] = useState(0)

  if (!list_double || _.isEmpty(list_double)) return <></>
  return <>
    <Stack>
      <Box>
        <Stack spacing={"md"}>
          {/* <Text>{list_double.length}</Text>
          <Text>{list_double![pointer]['SwotAnalisys'].length}</Text> */}

          {/* <Group>
            <Flex gap={"sm"} >
              {list_double.map((v, k) => <Button key={k}>
                <Text>{k + 1}</Text>
              </Button>)}
            </Flex>
          </Group> */}

          {!_.isEmpty(list_double) && !_.isEmpty(list_double![0]['SwotAnalisys']) && <Pagination total={list_double.length} onChange={(v) => {
            setPointer(null)
            setTimeout(() => {
              setPointer(v)
            }, 100)
          }} />}
          <ScrollArea h={500} p={"md"} style={{
            backgroundColor: "rgba(0, 0, 0, .25)"
          }}>
            <Stack>
              {/* <pre>
                {JSON.stringify(list_double, null, 2)}
              </pre> */}
              {pointer && !_.isEmpty(list_double![pointer - 1]['SwotAnalisys']) ? <Trs text={list_double![pointer - 1]['SwotAnalisys'][innerPointer]['content']} lang={"eng"}>
                {(val: any) => (
                  <>
                    {val && (
                      <TextAnimation
                        phrases={[val]}
                        typingSpeed={0}
                        backspaceDelay={0}
                        eraseDelay={0}
                        errorProbability={0.1}
                        eraseOnComplete={false}
                      />
                    )}
                  </>
                )}
              </Trs> : <Center>
                <Title>- Empty Data -</Title>
              </Center>}
            </Stack>
          </ScrollArea>
          {/* <Group position="right">
            <Flex gap={"lg"} bg={"gray"} px={"lg"} w={150} justify={"center"}>
              <ActionIcon onClick={() => {
                if (list_double![pointer]['SwotAnalisys'].length > 0 && innerPointer > 0) {
                  let p = innerPointer
                  p--;
                  setInnerPointer(p)
                } else {
                  let p = innerPointer
                  p++;
                  setInnerPointer(p)
                }
              }}>
                <MdArrowBackIos />
              </ActionIcon>
              <ActionIcon>
                <MdArrowForwardIos />
              </ActionIcon>
            </Flex>
          </Group> */}
        </Stack>
      </Box>
    </Stack>
  </>
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
  const { t, lang } = useTranslate();
  return (
    <>
      {listSingle?.map((v, i) => (
        <Stack key={i} spacing={0} pl={20}>
          <Box>
            <Title c={"green"}>
              {/* <Trs text={v.name} lang={lang}>
              {(val: any) => <div>{val}</div>}
            </Trs> */}
              {t("common:strength_analysis_improvement")}
            </Title>
          </Box>
          {v.SwotAnalisys.length > 0 && (
            <Stack>
              <Box>
                <ScrollArea
                  h={"100%"}
                  pl={5}
                  pt={20}
                  // bg={"white"}
                  // c={"gray"}
                  w={"80%"}
                >
                  {text == undefined ? (
                    <Stack>
                      <Text>...</Text>
                    </Stack>
                  ) : (
                    <Trs text={text} lang={lang}>
                      {(val: any) => (
                        <>
                          {val && (
                            <TextAnimation
                              phrases={[val]}
                              typingSpeed={10}
                              backspaceDelay={500}
                              eraseDelay={0}
                              errorProbability={0.1}
                              eraseOnComplete={false}
                            />
                          )}
                        </>
                      )}
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
              </Box>
              {/* <Flex>
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
                </Flex> */}
            </Stack>
          )}
        </Stack>
      ))}
    </>
  );
}
