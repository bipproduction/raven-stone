import { gloobal_fun_load_list_candidate } from "@/global/fun/global_fun_load_list_candidate";
import { global_list_candidate } from "@/global/val/global_list_candidate";
import { Button, Card, Group, Paper, Select, TextInput } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";
import { val_selected_candidate } from "../val/val_seleced_candidate";
import { fun_load_emotion_province } from "../fun/fun_load_emotion_province";
import moment from "moment";
import { val_list_emotion } from "../val/val_list_emotion";

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
  }
  return (
    <>
      <Paper shadow="md" withBorder p={"xs"} pos={"sticky"} top={0} sx={{
        zIndex: 100
      }}>
        <Group position="right" spacing={"lg"} align="end">
          <TextInput
            onChange={(val) => onSearch?.(val.target.value)}
            label={"search"}
            placeholder="search"
          />
          <Select
            placeholder={
              listCandidate.find((v: any) => v.id === selectedCandidate)?.name
            }
            label={"candidate"}
            data={listCandidate.map((v: any) => ({
              label: v.name,
              value: v.id,
            }))}
            onChange={(val) => {
              setSelectedCandidate(Number(val));
            }}
          />
          <Button onClick={onProccess}>process</Button>
        </Group>
      </Paper>
    </>
  );
}
