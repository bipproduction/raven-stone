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
import { val_selected_province_id } from "./val/val_selected_province_id";
import { val_kunci } from "./val/val_kunci";
import useTranslate from 'next-translate/useTranslation'

export const FrontEmotionalViewViaProvince = () => {
  const [candidateId, setCandidateId] = useAtom(val_selected_candidate);
  const [listEmotion, setListEmotion] = useAtom(val_list_emotion);
  // const { ref, width, height } = useElementSize();
  const [search, setSearch] = useDebouncedState("", 300);
  const [selectedMenu, setSelectedMenu] = useAtom(val_selected_menu_id);
  const [provinceId, setProvinceId] = useAtom(val_selected_province_id);
  const [kunci, setKunci] = useAtom(val_kunci)
  const {t,lang} = useTranslate();

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
            <Box key={i}>
              <SimpleGrid cols={2}>
                <Stack>
                  <Card h={760} sx={{ overflow: "scroll" }}>
                    <Stack spacing={"lg"}>
                      <Title c={"teal"}>{v.name}</Title>
                      <Center>
                        <ComChartBar lsData={v.emotion} />
                      </Center>
                      <Group position="center" spacing={"lg"}>
                        <Stack align="center">
                          <Title c={"orange"}>
                            {Intl.NumberFormat("id-ID").format(v.total)}
                          </Title>
                          <Text>{_.upperCase(t('common:locked_audience'))}</Text>
                        </Stack>
                        <Stack align="center">
                          <Title c={"green"}>
                            {Intl.NumberFormat("id-ID").format(
                              _.sum(_.values(v.emotion))
                            )}
                          </Title>
                          <Text>{_.upperCase(t('common:filtered_audience'))}</Text>
                        </Stack>
                      </Group>
                      <Center>
                        <Button
                          onClick={() => {
                            setProvinceId(v.id);
                            setSelectedMenu("2");
                          }}
                        >
                          DETAIL
                        </Button>
                      </Center>
                    </Stack>
                  </Card>
                </Stack>
                <Stack key={`${kunci}${search}`} >
                  <ComContextDirection provinceId={v.id} />
                  <ComLeaderPersona provinceId={v.id} />
                </Stack>
              </SimpleGrid>
            </Box>
          ))}
      </Stack>
    </>
  );
};