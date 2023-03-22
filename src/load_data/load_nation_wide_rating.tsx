import { gNationWideRating } from "@/g_state/nation_wide_rating/g_nation_wide_rating";
import { api } from "@/lib/api";
import { useShallowEffect } from "@mantine/hooks";

const LoadNationWideRating = () => {
  useShallowEffect(() => {
    // fetch(api.apiPredictiveAiNationWideRating)
    //   .then((v) => v.json())
    //   .then(gNationWideRating.set);
  }, []);
  return <></>;
};

export default LoadNationWideRating;
