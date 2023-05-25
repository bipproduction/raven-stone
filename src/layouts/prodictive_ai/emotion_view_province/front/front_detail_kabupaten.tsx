import {
  Box,
  Card,
  CloseButton,
  Flex,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useAtom } from "jotai";
import { val_selected_menu_id } from "./val/val_selected_menu_id";
import { funLoadEmotionKabupaten } from "./fun/fun_load_emotion_kabupaten";
import { val_selected_candidate } from "./val/val_seleced_candidate";
import moment from "moment";
import { val_selected_province_id } from "./val/val_selected_province_id";
import { useShallowEffect } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { ModelEmotionKabupaten } from "@/model/model_emotion_kabupaten";
import { global_fun_load_list_province } from "@/global/fun/global_fun_load_list_province";
import { ComChartDetailKabupaten } from "./com/com_chart_detail_kabupaten";
import _ from "lodash";
import { ComChartKabupatenContextDirection } from "./com/com_chart_kabupaten_context_direction";
import { ComChartKabupatenLeaderPersona } from "./com/com_chart_kabupaten_leader_persona";
import { ComKabupatenWordCloud } from "./com/com_kabupaten_word_cloud";

export function FrontDetailKabupaten() {
  const [selectedMenu, setSelectedMenu] = useAtom(val_selected_menu_id);
  const [candidateId, setSelectedCandidate] = useAtom(val_selected_candidate);
  const [provinceId, setProvinceId] = useAtom(val_selected_province_id);
  const [listEmotionKabupaten, setListEmotionalKabupaten] = useState<
    ModelEmotionKabupaten[]
  >([]);
  const [listProvince, setListProvince] = useState<any[]>([]);
  const [isLoading, setisLoading] = useState(false);

  useShallowEffect(() => {
    if (provinceId) {
      loadData();
      loadListProvince();
    }
  }, [provinceId]);
  async function loadData() {
    funLoadEmotionKabupaten({
      candidateId,
      date: moment().format("YYYY-MM-DD"),
      provinceId: provinceId!,
      setListEmotionalKabupaten,
    });
  }

  async function loadListProvince() {
    global_fun_load_list_province({
      provinceId: provinceId!,
    }).then(setListProvince);
  }
  return (
    <>
      <Stack>
        <Paper shadow="md" p={"sm"} pos={"sticky"} top={50} sx={{ zIndex: 100 }}>
          <Flex justify="space-between">
            <Title>
              {listProvince.find((val) => val.id === provinceId)?.name}
            </Title>
            <CloseButton
              loading={isLoading}
              size={"lg"}
              onClick={async () => {
                setisLoading(true);
                new Promise(() =>
                  setTimeout(() => {
                    setisLoading(false);
                    setSelectedMenu("1");
                  }, 1000)
                );
              }}
            />
          </Flex>
        </Paper>
        <Stack spacing={"lg"}>
          {listEmotionKabupaten.map((v, i) => (
            <Stack key={i}>
              <SimpleGrid cols={2}>
                <Card>
                  <Stack align="center">
                    <Title c={"teal"}>{v.City.name}</Title>
                    <ComChartDetailKabupaten
                      data={{
                        trust: v.trust,
                        joy: v.joy,
                        surprise: v.surprise,
                        anticipation: v.anticipation,
                        sadness: v.sadness,
                        fear: v.fear,
                        anger: v.anger,
                        disgust: v.disgust,
                      }}
                    />
                    <Group position="center" spacing={"lg"}>
                      <Stack align="center">
                        <Title c={"yellow"}>
                          {Intl.NumberFormat("id-ID").format(
                            v.City.CityValue[0].value
                          )}
                        </Title>
                        <Text>LOCKED AUDIENCES</Text>
                      </Stack>
                      <Stack align="center">
                        <Title c={"green"}>
                          {Intl.NumberFormat("id-ID").format(
                            _.sum([
                              v.trust,
                              v.joy,
                              v.surprise,
                              v.anticipation,
                              v.sadness,
                              v.fear,
                              v.anger,
                              v.disgust,
                            ])
                          )}
                        </Title>
                        <Text>FILTERED AUDIENCE</Text>
                      </Stack>
                    </Group>
                    <ComKabupatenWordCloud cityId={v.City.id} />
                  </Stack>
                </Card>
                <Stack>
                  <Card>
                    <Stack>
                      <Title c={"blue"}>Context Direction</Title>
                      <ComChartKabupatenContextDirection
                        data={
                          v.City.CityContextDirection[0]
                            ? v.City.CityContextDirection[0].content
                            : []
                        }
                      />
                    </Stack>
                  </Card>
                  <Card>
                    <Stack>
                      <Title c={"cyan"}>Leader Persona Prediction</Title>
                      <ComChartKabupatenLeaderPersona
                        data={
                          v.City.CityLeaderPersonaPrediction[0]
                            ? v.City.CityLeaderPersonaPrediction[0].data.content
                            : []
                        }
                      />
                    </Stack>
                  </Card>
                </Stack>
              </SimpleGrid>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </>
  );
}
