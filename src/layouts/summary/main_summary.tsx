import { Stack } from "@mantine/core";
import Top10DistrictbyConversation from "./top_10_district_by_conversation";
import Top10ProvinceByConversation from "./top_10_province_by_conversation";
import SummarySelectCandidate from "./summary_select_candidate";
import Sambutan from "../sambutan";

const MainSummary = () => {
  return (
    <>
      <Stack spacing={32}>
        <Sambutan />
        <SummarySelectCandidate />
        <Top10ProvinceByConversation />
        <Top10DistrictbyConversation />
      </Stack>
    </>
  );
};

export default MainSummary;
