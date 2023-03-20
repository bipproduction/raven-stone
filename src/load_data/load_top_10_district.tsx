import { api } from "@/lib/api";
import { gTop10District } from "@/g_state/g_top_10_district";
import { useHookstate } from "@hookstate/core";
import { useShallowEffect } from "@mantine/hooks";

const LoadTop10District = () => {
  useShallowEffect(() => {
    fetch(api.apiSummaryGetTop10DistrictByConversation)
      .then((v) => v.json())
      .then(gTop10District.set);
  }, []);

  return <></>;
};

export default LoadTop10District;
