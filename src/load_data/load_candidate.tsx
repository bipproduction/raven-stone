// import { gCandidate } from "@/g_state/g_candidate";
import { api } from "@/lib/api";
import { sCandidate } from "@/s_state/s_candidate";
import { useShallowEffect } from "@mantine/hooks";

const LoadCandidate = () => {
  useShallowEffect(() => {
    fetch(api.apiUtilGetCandidate)
      .then((v) => v.json())
      .then((v) => {
        sCandidate.value = v;
      });
  }, []);
  return <></>;
};

export default LoadCandidate;
