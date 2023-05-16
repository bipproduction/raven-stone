import {
  ActionIcon,
  Button,
  Flex,
  Loader,
  Paper,
  ScrollArea,
  Select,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useShallowEffect, useViewportSize } from "@mantine/hooks";
import {
  _fun_emotion_view_province_couple,
  _fun_load_candidate,
} from "./_fun_emotion_view_province_couple_v2";
import { useAtom } from "jotai";
import {
  _val_list_candidate,
  _val_list_emotion_view_province_couple,
  _val_selected_candidate1,
  _val_selected_candidate2,
} from "./_val_emotion_view_province_couple_v2";
import _ from "lodash";
import { MdDownload } from "react-icons/md";
import Link from "next/link";
import { api } from "@/lib/api";
import { Vie_emotion_view_province_couple_v2_upload } from "./_vie_emotion_view_province_couple_v2_upload";

export default function Vie_emotion_view_province_couple_v2() {
  const [listEmotion, setListEmotion] = useAtom(
    _val_list_emotion_view_province_couple
  );
  const [selectedCandidate1, setSelectedCandidate1] = useAtom(
    _val_selected_candidate1
  );
  const [selectedCandidate2, setSelectedCandidate2] = useAtom(
    _val_selected_candidate2
  );

  const [listCandidate, setListCandidate] = useAtom(_val_list_candidate);

  useShallowEffect(() => {
    _fun_emotion_view_province_couple({
      setListEmotion,
      selectedCandidate1,
      selectedCandidate2,
    });
  }, []);

  useShallowEffect(() => {
    _fun_load_candidate({ setListCandidate });
  }, []);

  async function onProccess() {
    _fun_emotion_view_province_couple({
      setListEmotion,
      selectedCandidate1,
      selectedCandidate2,
    });
  }

  if (!listEmotion || !listCandidate) return <Loader />;

  return (
    <Stack>
      <Title>Emotion View Province Couple V2 </Title>
      <Paper
        mx={"xs"}
        p={"xs"}
        shadow={"sm"}
        radius={"md"}
        bg={"gray.1"}
        pos={"sticky"}
        top={0}
        sx={{
          zIndex: 100,
        }}
      >
        <Flex gap={"md"} justify={"space-between"}>
          <Flex align={"end"} justify={"end"} gap={"xs"}>
            <Paper p={"xs"} shadow={"sm"} w={100} h={70}>
              <Stack spacing={0} align="center" justify="space-between">
                <a
                  href={
                    api.apiPredictiveAiEmotionViewProvinceCoupleV2Download +
                    `?candidate1=${selectedCandidate1}&candidate2=${selectedCandidate2}`
                  }
                >
                  <MdDownload size={24} />
                </a>
                <Text size={"xs"}>Download</Text>
              </Stack>
            </Paper>
            <Vie_emotion_view_province_couple_v2_upload />
          </Flex>
          <Flex gap={"xs"}>
            <Select
              onChange={(val) => setSelectedCandidate1(Number(val))}
              placeholder={
                listCandidate.find((v) => v.id === selectedCandidate1)?.name
              }
              data={listCandidate.map((val) => ({
                value: val.id,
                label: val.name,
              }))}
            />
            <Select
              onChange={(val) => setSelectedCandidate2(Number(val))}
              placeholder={
                listCandidate.find((v) => v.id === selectedCandidate2)?.name
              }
              data={listCandidate.map((val) => ({
                value: val.id,
                label: val.name,
              }))}
            />
            <Button onClick={onProccess}>PROCCESS</Button>
          </Flex>
        </Flex>
      </Paper>
      {/* {JSON.stringify(listEmotion)} */}
      <Paper
        bg={"gray.1"}
        shadow={"sm"}
        radius={"md"}
        p={"xs"}
        mx={"xs"}
        display={"inline"}
        pos={"relative"}
        sx={{
          overflow: "scroll",
        }}
      >
        <Table highlightOnHover withBorder withColumnBorders>
          <thead>
            <tr>
              {_.keys(listEmotion[0]).map((v, i) => (
                <th key={i}>
                  <Title order={5}>{_.upperCase(v)}</Title>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {listEmotion.map((val) => (
              <tr key={val.id}>
                {_.values(val).map((v, i) => (
                  <td key={i}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </Paper>
    </Stack>
  );
}
