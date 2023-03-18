import { gLiistWordCloud } from "@/g_state/g_word_cloud";
import { api } from "@/lib/api";
import { useHookstate } from "@hookstate/core";
import { useShallowEffect } from "@mantine/hooks";

const LoadWordCloud = () => {
  useShallowEffect(() => {
    fetch(api.apiSummaryGetWordCloud)
      .then((v) => v.json())
      .then(gLiistWordCloud.set);
  }, []);
  return <></>;
};

export default LoadWordCloud;
