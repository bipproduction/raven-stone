import { Button, Group, Loader, Paper, Select } from "@mantine/core";
import { v3_val_nation_wide_rating_list_candidate } from "../../val/v3_nation_wide_rating_list_candidate";
import { useShallowEffect } from "@mantine/hooks";
import { v3_fun_nation_wide_rating_load_list_candidate } from "../../fun/v3_fun_nation_wide_rating_load_list_candidate";
import { useAtom } from "jotai";
import { v3_val_back_selected_candidate } from "../val/v3_val_selected_candidate";
import _ from "lodash";

export function V3SelectCandidate() {
  const [listCandidate, setListCandidate] = useAtom(
    v3_val_nation_wide_rating_list_candidate
  );

  const [selectedCandidate, setSelectedCandidate] = useAtom(
    v3_val_back_selected_candidate
  );

  useShallowEffect(() => {
    v3_fun_nation_wide_rating_load_list_candidate({ setListCandidate });
  }, []);

  if (!listCandidate)
    return (
      <>
        <Loader />
      </>
    );
  return (
    <>
      <Paper p={"xs"}>
        <Group position="right" align="end">
          <Select
            key={_.random(1, 100)}
            placeholder={
              "" +
              listCandidate?.find(
                (v) => Number(v.id) == Number(selectedCandidate.candidate1Id)
              ).name
            }
            label="candidate 1"
            data={
              listCandidate?.map((v) => ({ label: v.name, value: v.id })) as any
            }
            onChange={(val) => {
              setSelectedCandidate({
                candidate1Id: Number(val),
                candidate2Id: selectedCandidate.candidate2Id,
              });
            }}
          />
          <Select
            key={_.random(1, 100)}
            placeholder={
              "" +
              listCandidate?.find(
                (v) => Number(v.id) == Number(selectedCandidate.candidate2Id)
              ).name
            }
            label="candidate 2"
            data={
              listCandidate?.map((v) => ({ label: v.name, value: v.id })) as any
            }
            onChange={(val) => {
              setSelectedCandidate({
                candidate2Id: Number(val),
                candidate1Id: selectedCandidate.candidate1Id,
              });
            }}
          />
          <Button>Submit</Button>
        </Group>
      </Paper>
    </>
  );
}
