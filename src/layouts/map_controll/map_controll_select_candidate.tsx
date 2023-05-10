import { useAtom } from "jotai";
import { useState } from "react";
import { mc_list_candidate } from "./map_controll_state";
import { Loader, Select } from "@mantine/core";
import _ from "lodash";

export function MapControllSelectCandidate({
  onChange,
}: {
  onChange: (val: string) => void;
}) {
  const [listCandidate, setListCandidate] = useAtom(mc_list_candidate);

  if (!listCandidate)
    return (
      <>
        <Loader />
      </>
    );
  if (_.isEmpty(listCandidate)) return <></>;
  return (
    <>
      <Select
        label={"select candidate"}
        onChange={onChange}
        placeholder={listCandidate!.find((v) => v.id == 1)?.name}
        data={[
          ...listCandidate!.map((v) => ({
            label: v.name,
            value: v.id,
          })),
        ]}
      />
    </>
  );
}
