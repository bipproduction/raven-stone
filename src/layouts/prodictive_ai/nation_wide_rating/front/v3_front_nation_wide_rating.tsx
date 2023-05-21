import { Title } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import { fun_v3_nation_wide_rating_load_list_data } from "../fun/fun_v3_nation_wide_rating_load_list_data";
import { useAtom } from "jotai";
import { _val_v3_nation_wide_rating_list_data } from "../val/v3_nation_wide_rating_list_data";

export function V3FrontNationWideRating() {
  const [listData, setListData] = useAtom(_val_v3_nation_wide_rating_list_data);
  useShallowEffect(() => {
    fun_v3_nation_wide_rating_load_list_data({ setListData });
  }, []);
  return (
    <>
      <Title>Front Nation Wide Rating</Title>
      {JSON.stringify(listData)}
    </>
  );
}
