import { gListNationWideChahrt } from "@/g_state/g_nation_wide_chart";
import { api } from "@/lib/api";
import { useHookstate } from "@hookstate/core";
import { useShallowEffect } from "@mantine/hooks";

const LoadNationWideChart = () => {
  useShallowEffect(() => {
    fetch(api.apiSummaryGetNationWideChart)
      .then((v) => v.json())
      .then(gListNationWideChahrt.set);
  }, []);
  return <></>;
};

export default LoadNationWideChart;
