import { api } from "@/lib/api";
import { sTop10District } from "@/s_state/s_top_10_district";
import { sTop10DistrictCount } from "@/s_state/s_top_10_district_count";
// import { gTop10District } from "@/g_state/top_10_district/g_top_10_district";
import { useHookstate } from "@hookstate/core";
import { useShallowEffect } from "@mantine/hooks";
// import { gTop10DistrictCount } from "@/g_state/top_10_district/g_top_10_district_take";
import _ from "lodash";

const LoadTop10District = () => {
  useShallowEffect(() => {
    fetch(api.apiSummaryGetTop10DistrictByConversation)
      .then((v) => v.json())
      .then((v) => {
        sTop10District.value = v
        sTop10DistrictCount.value = v
        // gTop10District.set(v);
        // gTop10DistrictCount.set(_.take(v, 10));
      });
  }, []);

  return <></>;
};

export default LoadTop10District;
