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
  TextInput,
  Title,
} from "@mantine/core";
import { useAtom } from "jotai";
import { val_selected_menu_id } from "./val/val_selected_menu_id";
import { funLoadEmotionKabupaten } from "./fun/fun_load_emotion_kabupaten";
import { val_selected_candidate } from "./val/val_seleced_candidate";
import moment from "moment";
import { val_selected_province_id } from "./val/val_selected_province_id";
import { useDebouncedState, useShallowEffect } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { ModelEmotionKabupaten } from "@/model/model_emotion_kabupaten";
import { global_fun_load_list_province } from "@/global/fun/global_fun_load_list_province";
import { ComChartDetailKabupaten } from "./com/com_chart_detail_kabupaten";
import _ from "lodash";
import { ComChartKabupatenContextDirection } from "./com/com_chart_kabupaten_context_direction";
import { ComChartKabupatenLeaderPersona } from "./com/com_chart_kabupaten_leader_persona";
import { ComKabupatenWordCloud } from "./com/com_kabupaten_word_cloud";
import { MdSearch } from "react-icons/md";
import useTranslate from "next-translate/useTranslation";
import { COLOR } from "@/global/fun/color_global";

export function FrontDetailKabupaten() {
  const [selectedMenu, setSelectedMenu] = useAtom(val_selected_menu_id);
  const [candidateId, setSelectedCandidate] = useAtom(val_selected_candidate);
  const [provinceId, setProvinceId] = useAtom(val_selected_province_id);
  const [listEmotionKabupaten, setListEmotionalKabupaten] = useState<
    ModelEmotionKabupaten[]
  >([]);
  const [listProvince, setListProvince] = useState<any[]>([]);
  const [isLoading, setisLoading] = useState(false);
  const [search, setSearch] = useDebouncedState<string>("", 300);
  const { t, lang } = useTranslate();

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
      <Stack pl={30} pr={30}>
        <Box
          pt={"sm"}
          pb={"sm"}
          pos={"sticky"}
          top={0}
          sx={{
            zIndex: 100,
            backgroundColor: "#230D38",
            padding: 5,
          }}
        >
          <Group
            position="apart"

          >
            <Box>
              <Text c={"white"} fz={40} fw={700}>
                {_.upperCase(
                  listProvince.find((val) => val.id === provinceId)?.name
                )}
              </Text>
            </Box>
            <Group spacing={70}>
              <TextInput
                onChange={(val) => {
                  if (val) {
                    setSearch(val.target.value);
                  }
                }}
                placeholder={t("common:search")}
                icon={<MdSearch />}
                w={400}
              />
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
            </Group>
          </Group>
        </Box>
        {/* <Box pb={20}>
          <Text c={"white"} fz={40} fw={700}>
            {_.upperCase(
              listProvince.find((val) => val.id === provinceId)?.name
            )}
          </Text>
        </Box> */}
        <Stack spacing={"lg"}>
          {listEmotionKabupaten
            .filter((v: any) => _.lowerCase(v.City.name).includes(search))
            .map((v, i) => (
              <Stack key={i}>
                {/* <pre>{JSON.stringify(v, null,2)}</pre> */}
                <SimpleGrid cols={2} spacing="xl" pb={50}>
                  <Box>
                    <Box key={search} w={"100%"}>
                      <ComKabupatenWordCloud cityId={v.City.id} />
                    </Box>
                    <Box>
                      <ComChartKabupatenContextDirection
                        data={
                          v.City.CityContextDirection[0]
                            ? v.City.CityContextDirection[0].content
                            : []
                        }
                      />
                    </Box>
                  </Box>
                  <Stack key={search}>
                    <Title c={"white"} pl={30} order={1}>
                      {_.upperCase(v.City.name)}
                    </Title>
                    <Group position="right" pr={40}>
                      <Title c={"white"} fz={20}>
                        {_.upperCase(t('common:sentiment_analysis'))}
                      </Title>
                    </Group>
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
                    <Group spacing={"lg"} pl={50}>
                      <Stack align="center">
                      <Text color={COLOR.merah}>{t('common:locked_audience')}</Text>
                        <Title c={COLOR.hijauTua} fz={25} fw={700}>
                          {Intl.NumberFormat("id-ID").format(
                            v.City.CityValue[0].value
                          )}
                        </Title>
                      </Stack>
                      <Stack align="center">
                      <Text color={COLOR.merah}>{t('common:filtered_audience')}</Text>
                        <Title c={COLOR.hijauTua} fz={25} fw={700}>
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
                      </Stack>
                    </Group>
                    <Box pt={20}>
                      <Stack>
                        <ComChartKabupatenLeaderPersona
                          data={
                            v.City.CityLeaderPersonaPrediction[0]
                              ? v.City.CityLeaderPersonaPrediction[0].data
                                  .content
                              : []
                          }
                        />
                      </Stack>
                    </Box>
                  </Stack>
                </SimpleGrid>
              </Stack>
            ))}
        </Stack>
      </Stack>
    </>
  );
}
