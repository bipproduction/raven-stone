import {
  Box,
  Button,
  Card,
  Center,
  Flex,
  Grid,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { ComSelectCandidate } from "./com/com_select_candidate";
import PageTitle from "@/layouts/page_title";
import {
  useDebouncedState,
  useElementSize,
  useShallowEffect,
} from "@mantine/hooks";
import { fun_load_emotion_province } from "./fun/fun_load_emotion_province";
import { useAtom } from "jotai";
import { val_selected_candidate } from "./val/val_seleced_candidate";
import { val_list_emotion } from "./val/val_list_emotion";
import { ComChartBar } from "./com/com_chart_bar";
import { ModelEmotionProvince } from "@/model/model_emotion_province";
import { ComContextDirection } from "./com/com_context_direction";
import { ComLeaderPersona } from "./com/com_leader_persona";
import _ from "lodash";
import { useState } from "react";
import { val_selected_menu_id } from "./val/val_selected_menu_id";

export const FrontEmotionalViewViaProvince = () => {
  const [candidateId, setCandidateId] = useAtom(val_selected_candidate);
  const [listEmotion, setListEmotion] = useAtom(val_list_emotion);
  const { ref, width, height } = useElementSize();
  const [search, setSearch] = useDebouncedState("", 300);
  const [selectedMenu, setSelectedMenu] = useAtom(val_selected_menu_id)

  useShallowEffect(() => {
    loadData();
  }, []);

  function loadData() {
    fun_load_emotion_province({
      candidateId,
      setListEmotion,
    });
  }
  return (
    <>
      <Stack spacing={"lg"}>
        <ComSelectCandidate onSearch={setSearch} />
        {/* <pre>{JSON.stringify(listEmotion, null, 2)}</pre> */}
        {listEmotion
          .filter((v) => _.lowerCase(v.name).includes(_.lowerCase(search)))
          .map((v: ModelEmotionProvince, i) => (
            <Box key={i} p={"md"}>
              <Paper p={"md"} shadow="md">
                <SimpleGrid cols={2}>
                  <Stack>
                    <Card h={height} sx={{ overflow: "scroll" }}>
                      <Stack spacing={"lg"}>
                        <Title>{v.name}</Title>
                        <Center>
                          <ComChartBar lsData={v.emotion} />
                        </Center>
                        <Group position="center" spacing={"lg"}>
                          <Stack align="center">
                            <Title c={"orange"}>
                              {Intl.NumberFormat("id-ID").format(v.total)}
                            </Title>
                            <Text>LOCKED AUDIENCES</Text>
                          </Stack>
                          <Stack align="center">
                            <Title c={"green"}>
                              {Intl.NumberFormat("id-ID").format(
                                _.sum(_.values(v.emotion))
                              )}
                            </Title>
                            <Text>LOCKED AUDIENCES</Text>
                          </Stack>
                        </Group>
                        <Center>
                          <Button onClick={() => setSelectedMenu("2")}>DETAIL</Button>
                        </Center>
                      </Stack>
                    </Card>
                  </Stack>
                  <Stack ref={ref}>
                    <ComContextDirection provinceId={v.id} />
                    <ComLeaderPersona provinceId={v.id} />
                  </Stack>
                </SimpleGrid>

                {/* <Grid>
                <Grid.Col span={"content"}>
                  <ComChartBar lsData={v.emotion} />
                </Grid.Col>
                <Grid.Col span={"auto"}>
                    {JSON.stringify(v)}
                </Grid.Col>
              </Grid> */}
              </Paper>
            </Box>
          ))}
      </Stack>
    </>
  );
};
