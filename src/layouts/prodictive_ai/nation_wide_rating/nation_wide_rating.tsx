import { Title } from "@mantine/core";
import { V3FrontNationWideRating } from "./front/v3_front_nation_wide_rating";
import { V3BackNationWideRating } from "./back/v3_back_nation_wide_rating";

export function NationWideRating() {
  return (
    <>
      <V3FrontNationWideRating />
      {/* <V3BackNationWideRating /> */}
    </>
  );
}
