import { gListSourceOfMention } from "@/g_state/g_source_of_mention";
import { api } from "@/lib/api";
import { useShallowEffect } from "@mantine/hooks";

const LoadSourceOfmention = () => {
  useShallowEffect(() => {
    fetch(api.apiSummaryGetSourceOfMention)
      .then((v) => v.json())
      .then(gListSourceOfMention.set);
  }, []);
  return <></>;
};

export default LoadSourceOfmention;
