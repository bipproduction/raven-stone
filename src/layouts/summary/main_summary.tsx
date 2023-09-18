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
import { Top5WinningRate } from "./top_5_winning_rate";
import { ViewGlobalAccessBlock } from "@/global/view/access_block";
import { sUser } from "@/s_state/s_user";
import Trs from "@/fun_load/trs";
import useTranslate from 'next-translate/useTranslation'

const MainSummary = () => {
  const { t, lang } = useTranslate()
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
                <Title c={"cyan.4"}>{sUser.value?.name}</Title>
                <Text>
                  {t('common:greeting')}
                  {/* <Trs text=" Welcome to Prabowo Subianto for President 2024 - Digital
                  Intelligence Winning Program." lang={lang}>
                    {(val:any) =><div>{val}</div>}
                  </Trs> */}
                </Text>
              </Stack>
            </Flex>
          </Paper>
        </Stack>
        <Grid align={"start"} w={"100%"}>
          <Grid.Col span={4}>
            <Box p={"xs"}>
              <ViewGlobalAccessBlock name="SummarySelectCandidate">
                <SummarySelectCandidate />
              </ViewGlobalAccessBlock>
            </Box>
          </Grid.Col>
          <Grid.Col span={8}>
            <ViewGlobalAccessBlock name="SummaryTrenSentiment">
              <SummaryTrenSentiment />
            </ViewGlobalAccessBlock>
          </Grid.Col>
        </Grid>
        <ViewGlobalAccessBlock name={"Top10ProvinceByConversation"}>
          <Top10ProvinceByConversation />
        </ViewGlobalAccessBlock>
        <ViewGlobalAccessBlock name="Top10DistrictbyConversation">
          <Top10DistrictbyConversation />
        </ViewGlobalAccessBlock>

        <ViewGlobalAccessBlock name="Top5WinningRate">
          <Top5WinningRate />
        </ViewGlobalAccessBlock>
      </Stack>
    </>
  );
};

export default MainSummary;
