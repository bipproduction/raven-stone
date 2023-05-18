import {
  Box,
  Flex,
  Grid,
  Image,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
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
        {/* <Sambutan /> */}

        <Stack>
          <Paper shadow={"md"}>
            <Flex>
              {/* <Box p={"md"}>
                <Image src={"/icon_robot.svg"} alt={"icon"} width={54} />
              </Box> */}
              <Stack p={"xs"} spacing={0}>
                <Title c={"cyan.4"}>Hi Mr. Chusni</Title>
                <Text>
                  Welcome to Prabowo Subianto for President 2024 - Digital
                  Intelligence Winning Program.
                </Text>
              </Stack>
            </Flex>
          </Paper>
        </Stack>
        <Grid align={"start"} w={"100%"}>
          <Grid.Col span={4}>
            <Box p={"xs"}>
              <SummarySelectCandidate />
            </Box>
          </Grid.Col>
          <Grid.Col span={8}>
            <SummaryTrenSentiment />
          </Grid.Col>
        </Grid>
        <Top10ProvinceByConversation />
        <Top10DistrictbyConversation />
      </Stack>
    </>
  );
};

export default MainSummary;
