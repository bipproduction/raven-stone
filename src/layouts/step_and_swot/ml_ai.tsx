import {
  ActionIcon,
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
import _ from "lodash";
import useTranslate from "next-translate/useTranslation";
import PageSubTitle from "@/global/components/PageSubTitle";
import { useState } from "react";
import { useShallowEffect } from "@mantine/hooks";
import Trs from "@/fun_load/trs";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import TextAnimation from "react-typing-dynamics";
import { api } from "@/lib/api";
import { sCandidate } from "@/s_state/s_candidate";
import { useAtom } from "jotai";
import { v3_val_nation_wide_rating_selected_candidate } from "../prodictive_ai/nation_wide_rating/val/v3_nation_wide_rating_selected_candidate";
import { v3_val_nation_wide_rating_list_candidate } from "../prodictive_ai/nation_wide_rating/val/v3_nation_wide_rating_list_candidate";

export default function Mlai() {
  const { t, lang } = useTranslate();
  return (
    <>
      <Stack spacing={"md"}>
        <PageSubTitle text1="ML-AI" text2="PROMPT RECOMEDATIONS" />
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
  const { t, lang } = useTranslate();
  return (
    <Stack spacing={"md"} pl={30} pr={30} pt={4}>
      <Grid gutter="lg">
        <Grid.Col md={2} lg={2}>
          <Box
            sx={{
              backgroundColor: "white",
              padding: 3,
              borderRadius: 10,
            }}
          >
            <Image
              alt="image"
              src={
                listCandidate?.find(
                  (v) => v.id == selectedCandidate.candidate2Id
                ).img
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
        </Grid.Col>
        <Grid.Col md={10} lg={10}>
          <SingleView listSingle={listSingle} />
        </Grid.Col>
      </Grid>
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
  const { t, lang } = useTranslate();
  return (
    <>
      {listSingle?.map((v, i) => (
        <Stack key={i} spacing={0} pl={20}>
          <Title c={"green"}>
            {/* <Trs text={v.name} lang={lang}>
              {(val: any) => <div>{val}</div>}
            </Trs> */}
            STRENGTH ANALYSIS IMPROVEMENT
          </Title>
          {v.SwotAnalisys.length > 0 && (
            <Stack>
                <Box>
                <ScrollArea
                  h={500}
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
