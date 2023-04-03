// import { gListNationWideChahrt } from "@/g_state/g_nation_wide_chart";
import { api } from "@/lib/api";
import { sListNationWideChahrt } from "@/s_state/s_list_nation_wide_chart";
import { useHookstate } from "@hookstate/core";
import { useShallowEffect } from "@mantine/hooks";

const LoadNationWideChart = () => {
  useShallowEffect(() => {
    fetch(api.apiSummaryGetNationWideChart)
      .then((v) => v.json())
      .then(v => {
        sListNationWideChahrt.value = v
      });
  }, []);
  return <></>;
};

export default LoadNationWideChart;
