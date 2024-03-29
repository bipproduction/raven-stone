// import { gTop10Province } from "@/g_state/top_10_province/g_top_10_province";
// import { gTop10ProvinceTake } from "@/g_state/top_10_province/g_top_10_province_take";
import { api } from "@/lib/api";
import { ModelTop10Province } from "@/model/top_10_province";
import { sTop10Province } from "@/s_state/s_top_10_province";
import { sTop10ProvinceTake } from "@/s_state/s_top_10_province_take";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { useState } from "react";

const LoadTop10Province = () => {
  const loadData = async () => {
    const res = await fetch(
      api.apiSummaryGetTop10ProvinceByConversation + "?date=2023-03-16"
    );
    if (res.status === 200) {
      const data = await res.json();
      sTop10Province.value = data
      sTop10ProvinceTake.value = data
      // gTop10Province.set(data);
      // gTop10ProvinceTake.set(_.take(data, 10));
    }
  };

  useShallowEffect(() => {
    loadData();
  }, []);
  return <></>;
};

// export default LoadTop10Province;
