import {
  Button,
  Center,
  Flex,
  Group,
  Image,
  Loader,
  Modal,
  Paper,
  ScrollArea,
  Select,
  SimpleGrid,
  Space,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { _fun_loadNationWideRating } from "../../../dev/predictive_ai/fun_dev_nation_wide_rating";
import { useAtom } from "jotai";
import { _val_listNation } from "../../../dev/predictive_ai/val_dev_nation_wide_rating";
import PageTitle from "../../../page_title";
import { _val_list_candidate } from "../../../candidate/_val_candidate";
import { _func_candidate_get } from "../../../candidate/_fun_candidate";
import { useState } from "react";
import _ from "lodash";
import TextAnimation from "react-typing-dynamics";
import prs from "html-react-parser";
import { NationWideRatingV2Chart } from "./nation_wide_rating_v2_chart";
import { atomWithStorage } from "jotai/utils";
import { V3ComNationWideRatingLineChart } from "./com/v3_com_nation_wide_rating_line_chart";

export default function NationWideRatingv2() {
  const [listNation, setListNationWideRating] = useAtom(_val_listNation);
  const [listCandidate, setListCandidate] = useAtom(_val_list_candidate);
  const [selectedCandidate1, setSelectedCandidate1] = useState(1);
  const [selectedCandidate2, setSelectedCandidate2] = useState(2);
  const [selectedData, setSelectedData] = useState<any | undefined>();

  useShallowEffect(() => {
    _fun_loadNationWideRating({ setListNationWideRating });
    _func_candidate_get({ setListCandidate });
  }, []);

  useShallowEffect(() => {
    if (listCandidate && listNation) {
      onProccess();
    }
  }, [listCandidate, listNation]);

  async function onProccess() {
    const data = listNation?.find(
      (v) =>
        Number(v.candidate_1_id) == Number(selectedCandidate1) &&
        Number(v.candidate_2_id) == Number(selectedCandidate2)
    );

    if (data) {
      setSelectedData(data);
    }
  }

  if (!listCandidate || !listNation)
    return (
      <>
        <Center>
          <Loader />
        </Center>
      </>
    );

  return (
    <>
      <Stack>
        <PageTitle
          title="NATION WIDE RATING"
          text="EMOTIONAL METERS BRAND MERGER SIMULATION"
        />
        <Paper
          // bg={"blue.1"}
          p={"xs"}
          shadow={"md"}
          pos={"sticky"}
          top={60}
          style={{
            zIndex: 100,
          }}
        >
          <Group position="right" spacing={"md"}>
            <Select
              placeholder={
                listCandidate.find((v) => v.id == selectedCandidate1)?.name
              }
              onChange={(val) => {
                if (val) {
                  setSelectedCandidate1(Number(val));
                }
              }}
              radius={100}
              data={
                listCandidate?.map((val) => ({
                  label: val.name,
                  value: val.id,
                })) as any
              }
            />
            <Select
              onChange={(val) => {
                if (val) {
                  setSelectedCandidate2(Number(val));
                }
              }}
              placeholder={
                listCandidate.find((v) => v.id == selectedCandidate2)?.name
              }
              radius={100}
              data={
                listCandidate?.map((val) => ({
                  label: val.name,
                  value: val.id,
                })) as any
              }
            />
            <Button onClick={onProccess} radius={100}>
              PROCCESS
            </Button>
          </Group>
        </Paper>
        <Flex gap={"md"}>
          <Stack w={"100%"} spacing={"md"}>
            <Paper
              p={"md"}
              // bg={"yellow.2"}
              shadow="md"
            >
              <Flex align={"center"} justify={"center"} gap={"lg"}>
                <Stack align="center" w={200}>
                  <Image
                    radius={100}
                    width={100}
                    src={
                      listCandidate.find((v) => v.id == selectedCandidate1)?.img
                    }
                    alt=""
                  />
                  <Title
                    align="center"
                    lineClamp={1}
                    // c={"gray.8"}
                    order={3}
                  >
                    {_.upperCase(
                      listCandidate.find((v) => v.id == selectedCandidate1)
                        ?.name
                    )}
                  </Title>
                </Stack>
                <Space w={20} />
                <Stack align="center" w={200}>
                  <Image
                    radius={100}
                    width={100}
                    src={
                      listCandidate.find((v) => v.id == selectedCandidate2)?.img
                    }
                    alt=""
                  />
                  <Title
                    align="center"
                    lineClamp={1}
                    // c={"gray.8"}
                    order={3}
                  >
                    {_.upperCase(
                      listCandidate.find((v) => v.id == selectedCandidate2)
                        ?.name
                    )}
                  </Title>
                </Stack>
              </Flex>
            </Paper>
            <Paper
              p={"md"}
              // bg={"blue.1"}
              shadow="md"
            >
              <NationWideRatingV2Chart data={selectedData} />
            </Paper>
            <Paper p={"md"}>
              <V3ComNationWideRatingLineChart  />
            </Paper>
          </Stack>
          <Stack w={600} spacing={"md"}>
            <Paper p={"xs"} bg={"dark.3"} shadow="md">
              <Stack spacing={"md"}>
                <SimpleGrid cols={2}>
                  <Title align="end" c={"gray.2"}>
                    WINNING RATES PREDICTION
                  </Title>
                  <Paper p={"xs"} bg={"dark.4"} shadow="md">
                    <Stack justify="center" align="center" h={100}>
                      <Title c={"green"} fz={46}>
                        {selectedData?.rate}%
                      </Title>
                    </Stack>
                  </Paper>
                </SimpleGrid>
                <Paper bg={"dark.6"} p={"xs"} w={"100%"} shadow="md">
                  <ScrollArea h={500} c={"white"}>
                    {selectedData && selectedData.text && (
                      <TextAnimation
                        key={selectedData.id}
                        phrases={[selectedData?.text!]}
                        typingSpeed={10}
                        backspaceDelay={500}
                        eraseDelay={0}
                        errorProbability={0.1}
                        eraseOnComplete={false}
                      />
                    )}
                  </ScrollArea>
                </Paper>
              </Stack>
            </Paper>
          </Stack>
        </Flex>
      </Stack>
    </>
  );
}
