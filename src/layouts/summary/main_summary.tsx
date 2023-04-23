import { Box, Flex, Paper, Stack } from "@mantine/core";
import Top10DistrictbyConversation from "./top_10_district_by_conversation";
import Top10ProvinceByConversation from "./top_10_province_by_conversation";
import SummarySelectCandidate from "./summary_select_candidate";
import Sambutan from "../sambutan";
import SummaryDataChart from "./summary_data_chart";
import { stylesGradient1 } from "@/styles/styles_gradient_1";
import { SummaryTrenSentiment } from "./summary_tren_sentiment";

const MainSummary = () => {
  return (
    <>
      <Stack spacing={32}>
        <Sambutan />
        <Flex gap={"md"} align={"start"} w={"100%"}>
          <Box p={"xs"}>
            <SummarySelectCandidate />
          </Box>
          {/* <SummaryDataChart /> */}
          <SummaryTrenSentiment />
        </Flex>
        <Top10ProvinceByConversation />
        <Top10DistrictbyConversation />
      </Stack>
    </>
  );
};

export default MainSummary;
