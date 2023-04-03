// import { gCandidate } from "@/g_state/g_candidate";
// import { gPredictiveAiSearch } from "@/g_state/g_predictive_ai_search";
import { sCandidate } from "@/s_state/s_candidate";
import { sPredictiveAiSearch } from "@/s_state/s_predictive_ai_search";
// import { gSelectedCandidate1 } from "@/g_state/nation_wide_rating/g_selected_candidate1";
// import { gSelectedCandidate2 } from "@/g_state/nation_wide_rating/g_selected_candidate2";
import { sSelectedCandidate1 } from "@/s_state/s_selected_candidate1";
import { sSelectedCandidate2 } from "@/s_state/s_selected_candidate2";
import { Button, Group, Paper, Select, TextInput } from "@mantine/core";
import { MdSearch } from "react-icons/md";
import SwipeButton from "./swipe_button";

const SelectCandidateView = ({
  onProccess,
  onUpdate,
}: {
  onProccess: () => void;
  onUpdate: () => void;
}) => {
  //   const update = useForceUpdate();

  return (
    <>
      <Paper
        bg={"blue.1"}
        shadow={"md"}
        // my={50}
        pos={"sticky"}
        top={50}
        sx={{
          zIndex: 100,
        }}
      >
        <Group p={"xs"} position="right">
          <TextInput
            // value={gPredictiveAiSearch.value}
            onChange={(val) => {
              // sPredictiveAiSearch.set(val.currentTarget.value);
              sPredictiveAiSearch.value = val.currentTarget.value
              onUpdate();
            }}
            placeholder={sPredictiveAiSearch.value}
            icon={<MdSearch />}
          />
          <Select
            key={Math.random()}
            placeholder={
              sCandidate.value.find((v) => v.id === sSelectedCandidate1.value)
                ?.name
            }
            searchable
            data={
              sCandidate.value.map((v) => ({
                label: v.name,
                value: v.id,
                disabled: v.id == sSelectedCandidate2.value,
              })) as any
            }
            onChange={(val) => {
              if (val) {
                sSelectedCandidate1.value = Number(val);
                onUpdate();
              }
            }}
          />
          <SwipeButton update={onUpdate} />
          <Select
            key={Math.random()}
            placeholder={
              sCandidate.value.find((v) => v.id === sSelectedCandidate2.value)
                ?.name
            }
            searchable
            data={
              sCandidate.value.map((v) => ({
                label: v.name,
                value: v.id,
                disabled: v.id == sSelectedCandidate1.value,
              })) as any
            }
            onChange={(val) => {
              if (val) {
                sSelectedCandidate2.value = Number(val);
                onUpdate();
              }
            }}
          />
          <Button onClick={onProccess}>PROCCESS</Button>
        </Group>
      </Paper>
    </>
  );
};

export default SelectCandidateView;
