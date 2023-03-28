import { gCandidate } from "@/g_state/g_candidate";
import { gListDataPredictiveAiCouple } from "@/g_state/g_list_data_predictive_ai_couple";
import { gSelectedDate } from "@/g_state/g_map_state";
import { gPredictiveAiSearch } from "@/g_state/g_predictive_ai_search";
import { gSelectedCandidate1 } from "@/g_state/nation_wide_rating/g_selected_candidate1";
import { gSelectedCandidate2 } from "@/g_state/nation_wide_rating/g_selected_candidate2";
import { api } from "@/lib/api";
import { Button, Group, Paper, Select, TextInput } from "@mantine/core";
import { useForceUpdate, useShallowEffect } from "@mantine/hooks";
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
        my={50}
        pos={"sticky"}
        top={100}
        sx={{
          zIndex: 100,
        }}
      >
        <Group p={"xs"} position="right">
          <TextInput
            value={gPredictiveAiSearch.value}
            onChange={(val) => gPredictiveAiSearch.set(val.currentTarget.value)}
            placeholder={"search"}
            icon={<MdSearch />}
          />
          <Select
            key={Math.random()}
            placeholder={
              gCandidate.value.find((v) => v.id === gSelectedCandidate1.value)
                ?.name
            }
            searchable
            data={
              gCandidate.value.map((v) => ({
                label: v.name,
                value: v.id,
                disabled: v.id == gSelectedCandidate2.value,
              })) as any
            }
            onChange={(val) => {
              if (val) {
                gSelectedCandidate1.set(Number(val));
                onUpdate();
              }
            }}
          />
          <SwipeButton update={onUpdate} />
          <Select
            key={Math.random()}
            placeholder={
              gCandidate.value.find((v) => v.id === gSelectedCandidate2.value)
                ?.name
            }
            searchable
            data={
              gCandidate.value.map((v) => ({
                label: v.name,
                value: v.id,
                disabled: v.id == gSelectedCandidate1.value,
              })) as any
            }
            onChange={(val) => {
              if (val) {
                gSelectedCandidate2.set(Number(val));
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
