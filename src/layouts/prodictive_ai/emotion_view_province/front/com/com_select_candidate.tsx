import { gloobal_fun_load_list_candidate } from "@/global/fun/global_fun_load_list_candidate";
import { global_list_candidate } from "@/global/val/global_list_candidate";
import {
  Box,
  Button,
  Card,
  Group,
  Paper,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";
import { val_selected_candidate } from "../val/val_seleced_candidate";
import { fun_load_emotion_province } from "../fun/fun_load_emotion_province";
import moment from "moment";
import { val_list_emotion } from "../val/val_list_emotion";
import { val_kunci } from "../val/val_kunci";
import useTranslate from "next-translate/useTranslation";
import { COLOR } from "@/global/fun/color_global";
import _ from "lodash";

export function ComSelectCandidate({
  onSearch,
}: {
  onSearch?: (v: string) => void;
}) {
  const [listCandidate, setListCandidate] = useAtom(global_list_candidate);
  const [listEmotion, setListEmotion] = useAtom(val_list_emotion);
  const [selectedCandidate, setSelectedCandidate] = useAtom(
    val_selected_candidate
  );

  const [kunci, setKunci] = useAtom(val_kunci);
  const { t, lang } = useTranslate();

  useShallowEffect(() => {
    gloobal_fun_load_list_candidate({
      setListCandidate,
    });
  }, []);

  function onProccess() {
    fun_load_emotion_province({
      candidateId: selectedCandidate,
      setListEmotion,
      date: moment().format("YYYY-MM-DD"),
    });
    setKunci(Math.random());
  }
  return (
    <>
      <Box
        pos={"sticky"}
        top={0}
        sx={{
          zIndex: 100,
          backgroundColor: "#230D38",
          padding: 5,
        }}
        pt={"sm"}
        pb={"sm"}
      >
        <Group position="right" spacing={"lg"} align="end">
          <TextInput
            onChange={(val) => onSearch?.(val.target.value)}
            label={ <Text fz={17} color="white">{t("common:search")}</Text>}
            placeholder={t("common:search")}
          />
          <Select
            placeholder={
              listCandidate.find((v: any) => v.id === selectedCandidate)?.name
            }
            label={ <Text fz={17} color="white">{t("common:candidate")}</Text>}
            data={listCandidate.map((v: any) => ({
              label: v.name,
              value: v.id,
            }))}
            onChange={(val) => {
              setSelectedCandidate(Number(val));
            }}
          />
          <Button onClick={onProccess} color="gray.0" radius={"lg"}><Text color="dark">GENERATE</Text></Button>
        </Group>
      </Box>
    </>
  );
}
