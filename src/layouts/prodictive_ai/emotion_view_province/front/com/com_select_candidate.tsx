import { gloobal_fun_load_list_candidate } from "@/global/fun/global_fun_load_list_candidate";
import { global_list_candidate } from "@/global/val/global_list_candidate";
import { Box, Button, Card, Group, Paper, Select, TextInput } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";
import { val_selected_candidate } from "../val/val_seleced_candidate";
import { fun_load_emotion_province } from "../fun/fun_load_emotion_province";
import moment from "moment";
import { val_list_emotion } from "../val/val_list_emotion";
import { val_kunci } from "../val/val_kunci";
import useTranslate from 'next-translate/useTranslation'

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

  const [kunci, setKunci] = useAtom(val_kunci)
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
    setKunci(Math.random())
  }
  return (
    <>
      <Box p={"xs"}  pos={"sticky"} top={50} sx={{
        zIndex: 100
      }}>
        <Group position="right" spacing={"lg"} align="end">
          <TextInput
            onChange={(val) => onSearch?.(val.target.value)}
            label={t('common:search')}
            placeholder={t('common:search')}
          />
          <Select
            placeholder={
              listCandidate.find((v: any) => v.id === selectedCandidate)?.name
            }
            label={t('common:candidate')}
            data={listCandidate.map((v: any) => ({
              label: v.name,
              value: v.id,
            }))}
            onChange={(val) => {
              setSelectedCandidate(Number(val));
            }}
          />
          <Button onClick={onProccess}>{t('common:process')}</Button>
        </Group>
      </Box>
    </>
  );
}
