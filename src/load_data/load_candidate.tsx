import { gCandidate } from "@/g_state/g_candidate";
import { api } from "@/lib/api";
import { useShallowEffect } from "@mantine/hooks";

const LoadCandidate = () => {
  useShallowEffect(() => {
    fetch(api.apiUtilGetCandidate)
      .then((v) => v.json())
      .then(gCandidate.set);
  }, []);
  return <></>;
};

export default LoadCandidate;
