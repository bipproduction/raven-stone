import { gloobal_fun_load_list_candidate } from "@/global/fun/global_fun_load_list_candidate";
import { global_list_candidate } from "@/global/val/global_list_candidate";
import { Button, Card, Group, Paper, Select, TextInput } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useAtom } from "jotai";
import { val_selected_candidate } from "../val/val_seleced_candidate";

export function ComSelectCandidate() {
  const [listCandidate, setListCandidate] = useAtom(global_list_candidate);
  const [selectedCandidate, setSelectedCandidate] = useAtom(
    val_selected_candidate
  );

  useShallowEffect(() => {
    gloobal_fun_load_list_candidate({
      setListCandidate,
    });
  }, []);
  return (
    <>
      <Paper shadow="md" withBorder p={"xs"}>
        <Group position="right" spacing={"lg"} align="end">
          <TextInput label={"search"} placeholder="search" />
          <Select
            placeholder={listCandidate.find((v: any) => v.id === selectedCandidate)?.name}
            label={"candidate"}
            data={listCandidate.map((v: any) => ({
              label: v.name,
              value: v.id,
            }))}
            onChange={(val) => {
              setSelectedCandidate(Number(val));
            }}
          />
          <Button>process</Button>
        </Group>
      </Paper>
    </>
  );
}
